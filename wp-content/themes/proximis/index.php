<?php get_header(); ?>

<div class='container'>

	<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

	<div class='container-medium'>

		<h1 class='blog-title'>
			<?php
				global $wp_query;
				$results = $wp_query->found_posts . ' ';
				if( is_category() ) {
					$category_title = single_cat_title('', false);
					
					printf(_n('%d post in the category %s', '%d posts in the category %s', $results, 'proximis'), $results, $category_title); 
				} else if( is_search() ) {
					$search_query = get_search_query();
					
					printf(_n('%d post found for "%s"', '%d posts found for "%s"', $results, 'proximis'), $results, $search_query); 
				} else if( is_author() ) {
					echo __('Posts published by', 'proximis') .' '. get_the_author();

				} else {
					single_post_title();
				}
			?>
		</h1>

		<?php
			$blog = get_option( 'page_for_posts' );
			$books = get_field('book', $blog);
			$newsletter = get_field('newsletter', $blog);
			$current_category = get_queried_object();
			$current_category_id = $current_category ? $current_category->term_id : null;
			
			the_field('text', $blog);
		?>

		<div class="wrapper-cat-search">
			<div id="cats" class="blog-categories off">
				<button id="category-select-button" class="category-select-button js-category-select-button" type="button">
					<?php echo $current_category_id ? $current_category->name : __('Display all posts', 'proximis'); ?>
				</button>
				
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
		<div class="wrapper-blog-list">
			<?php if ( $wp_query->have_posts() ) : $countPosts = 0; ?>
				
				<ul class='blog-list' id='blog'>

					<?php while ( $wp_query->have_posts() ) : the_post(); $countPosts ++; ?>

						<?php if($books) : foreach($books as $book) : ?>

							<?php if( $book['display'] && $countPosts == $book['pos'] ) : ?>
								<li class='book'>
									<?php if($book['img']) echo wp_get_attachment_image($book['img'], 'medium'); ?>
									<h2><?php echo $book['title']; ?></h2>
									<p><?php echo $book['text']; ?></p>
									<?php if($book['link']) : ?>
										<a href='<?php echo $book['link']['url']; ?>' class='btn big'><?php echo $book['link']['title']; ?></a>
									<?php endif; ?>
								</li>
							<?php $countPosts++; endif; ?>

						<?php endforeach; endif; ?>

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
								<a href='<?php the_permalink(); ?>' class='post-img' style='background-image:url(<?php the_post_thumbnail_url("large"); ?>)'></a>
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
					<?php echo paginate_links(
						array(
							'prev_next' => false,
							'end_size' => 2
						)
					); ?>
				</div>
		
			<?php else : ?>
						
				<p><?php _e('There are no posts here', 'proximis'); ?></p>

			<?php endif; ?>
		</div>

	</div>

</div>

<?php get_footer(); ?>