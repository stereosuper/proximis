<?php get_header(); ?>

<div class='container'>

	<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

	<div class='container-medium'>

		<h1 class='blog-title'><?php single_post_title(); ?></h1>

		<?php
			$blog = get_option( 'page_for_posts' );
			$book = get_field('book', $blog);
			
			the_field('text', $blog);
		?>

		<ul class='blog-cats off' id='cats'>
			<li><a href='#'><?php _e('Display all posts', 'proximis'); ?></a></li>
			<?php wp_list_categories( array('title_li' => '') ); ?>
		</ul>

		<?php if ( have_posts() ) : $countPosts = 0; ?>

			<ul class='blog-list' id='blog'>

				<?php while ( have_posts() ) : the_post(); $countPosts ++; ?>
					
					<li class='post'>
						<?php if( has_post_thumbnail() ) : ?>
							<a href='<?php the_permalink(); ?>' class='post-img' style='background-image:url(<?php the_post_thumbnail_url("full"); ?>)'></a>
						<?php endif; ?>

						<header class='post-header'>
							<?php $author = get_the_author(); ?>
							<a href='<?php get_the_author_link(); ?>' class='author'>
								<div class='img'><?php echo get_avatar( $author ); ?></div>
								<?php echo $author; ?>
							</a>
							<time><?php echo get_the_date(); ?></time>
						</header>

						<a href='<?php the_permalink(); ?>'>
							<h2><?php the_title(); ?></h2>
							<?php the_excerpt(); ?>
						</a>

						<footer class='post-footer'>
							<div class='cats'>
								<?php $cats = get_the_category(); if( $cats ) :
									$count = 0;
									foreach( $cats as $cat ) :
										$count ++;
										if( $count > 1 ) echo ', ';
										echo '<a href="' . get_category_link( $cat->term_id ) . '">' . $cat->cat_name . '</a>';
									endforeach;
								endif; ?>
							</div>
							<?php echo do_shortcode('[rt_reading_time postfix="min"]'); ?>
						</footer>
					</li>
					
					<?php if( $book && $book['display'] && $countPosts + 1 == $book['pos'] ) : ?>
						<li class='book'>
							<?php echo wp_get_attachment_image($book['img'], 'medium'); ?>
							<h2><?php echo $book['title']; ?></h2>
							<p><?php echo $book['text']; ?></p>
							<a href='<?php echo $book['link']['url']; ?>' class='btn big'><?php echo $book['link']['title']; ?></a>
						</li>
					<?php endif; ?>
				
				<?php endwhile; ?>

			</ul>

			<div class='pagination'>
				<?php echo paginate_links( array( 'prev_text' => '<b>‹</b> <span>' . 'Précédent' . '</span>', 'next_text'  => '<span>' . 'Suivant' . '</span> <b>›</b>' ) ); ?>
			</div>
		
		<?php else : ?>
					
			<p><?php _e('No posts yet'); ?></p>

		<?php endif; ?>

	</div>

</div>

<?php get_footer(); ?>