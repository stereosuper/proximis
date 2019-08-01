<?php get_header(); ?>

<div class='container'>

	<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

	<div class='container-medium'>

		<h1 class='blog-title'>
			<?php
				if( is_category() ) {

					global $wp_query;
					$results = $wp_query->found_posts . ' ';
					$results .= $results > 1 ? __('posts', 'proximis') : __('post', 'proximis');
					$type = __('in the category');
					echo "$results $type \"".single_cat_title('', false).'"'; 
					
				} else if( is_search() ) {
					
					global $wp_query;
					$results = $wp_query->found_posts . ' ';
					$results .= $results > 1 ? __('posts', 'proximis') : __('post', 'proximis');
					$type = __('found for');
					echo "$results $type \"".get_search_query().'"'; 

				} else if( is_author() ) {

					echo __('Posts published by ') . get_the_author();

				} else {
					single_post_title();
				}
			?>
		</h1>

		<?php
			$blog = get_option( 'page_for_posts' );
			$book = get_field('book', $blog);
			$newsletter = get_field('newsletter', $blog);
			$current_category = get_queried_object();
			$current_category_id = $current_category->term_id;
			
			the_field('text', $blog);
		?>

		<div class="wrapper-cat-search">
			<div id="cats" class="blog-categories off">
				<?php if (!$current_category_id): ?>
					<button id="category-select-button" class="category-select-button js-category-select-button" type="button">
						<?php _e('Display all posts', 'proximis'); ?>
					</button>
				<?php else: ?>
					<button class="category-select-button js-category-select-button" type="button">
						<?php echo $current_category->name ?>
					</button>
				<?php endif; ?>
				<ul class="blog-cats-list">
					<?php if ($current_category_id): ?>
						<li>
							<a href="<?php echo get_permalink($blog); ?>">
								<?php _e('Display all posts', 'proximis'); ?>
							</a>
						</li>
					<?php endif; ?>
					<?php wp_list_categories(
						array(
							'title_li' => '',
							'exclude' => $current_category_id,
							'show_option_none' => ''
						)
					); ?>
				</ul>
			</div>
			<?php get_search_form(); ?>
		</div>

		<?php if ( have_posts() ) : $countPosts = 0; ?>

			<ul class='blog-list' id='blog'>

				<?php while ( have_posts() ) : the_post(); $countPosts ++; ?>

					<?php if( $book && $book['display'] && $countPosts == $book['pos'] ) : ?>
						<li class='book'>
							<?php echo wp_get_attachment_image($book['img'], 'medium'); ?>
							<h2><?php echo $book['title']; ?></h2>
							<p><?php echo $book['text']; ?></p>
							<a href='<?php echo $book['link']['url']; ?>' class='btn big'><?php echo $book['link']['title']; ?></a>
						</li>
					<?php 
					$countPosts++;
					endif; 
					?>

					<?php if( $newsletter && $newsletter['display'] && $countPosts == $newsletter['pos'] ) : ?>
						<li class="newsletter-in-list">
							<?php get_template_part('includes/newsletter'); ?>
						</li>
					<?php 
					$countPosts++;
					endif; 
					?>
					
					<li class='post'>
						<?php if( has_post_thumbnail() ) : ?>
							<a href='<?php the_permalink(); ?>' class='post-img' style='background-image:url(<?php the_post_thumbnail_url("full"); ?>)'></a>
						<?php endif; ?>

						<header class='post-head'>
							<?php $author = get_the_author(); ?>
							<a href='<?php echo get_author_posts_url(get_the_author_meta( 'ID' )); ?>' class='logo-link'>
								<span class="img author-img"><?php echo get_avatar( $author ); ?></span>
								<?php echo $author; ?>
							</a>
							<time class="related-date"><?php echo get_the_date(); ?></time>
						</header>

						<a class="post-content-link" href='<?php the_permalink(); ?>'>
							<h2 class="related-title"><?php the_title(); ?></h2>
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
							<?php echo do_shortcode('[rt_reading_time postfix="min" postfix_singular="min"]'); ?>
						</footer>
					</li>
				
				<?php endwhile; ?>

			</ul>

			<div class='pagination'>
				<?php echo paginate_links( array( 'prev_text' => '<b>‹</b> <span>' . 'Précédent' . '</span>', 'next_text'  => '<span>' . 'Suivant' . '</span> <b>›</b>' ) ); ?>
			</div>
		
		<?php else : ?>
					
			<p><?php _e('There are no posts here', 'proximis'); ?></p>

		<?php endif; ?>

	</div>

</div>

<?php get_footer(); ?>