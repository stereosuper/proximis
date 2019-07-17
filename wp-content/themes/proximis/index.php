<?php get_header(); ?>

<div class='container'>

	<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

	<div class='container-medium'>

		<h1><?php single_post_title(); ?></h1>

		<?php the_field('text', get_option( 'page_for_posts' )); ?>

		<ul>
			<?php wp_list_categories( array('title_li' => '') ); ?>
		</ul>

		<?php if ( have_posts() ) : ?>

			<ul class='blog-list' id='blog'>

				<?php while ( have_posts() ) : the_post(); ?>
					
					<li class='post'>
						<?php if( has_post_thumbnail() ) : ?>
							<a href='<?php the_permalink(); ?>'><?php the_post_thumbnail(); ?></a>
						<?php endif; ?>
						<time><?php echo get_the_date(); ?></time>
						<a href='<?php the_permalink(); ?>' class='post-link'>
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