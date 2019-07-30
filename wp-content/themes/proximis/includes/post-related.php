<?php
	global $post;
	$currentPost = $post;
	$terms = get_the_terms($post, 'category');
	$termsIds = array();

	$args = array(
		'tax_query' => array(
			'relation' => 'OR',
		),
		'post__not_in' => array($post->ID),
		'posts_per_page' => 3
	);

	if( $terms ){
		foreach( $terms as $term ){
			$termsIds[] = $term->term_id;
		}
		$args['tax_query'][] = array(
			'taxonomy' => 'category',
			'field'    => 'term_id',
			'terms'    => $termsIds,
		);
	}

	$relatedQuery = new WP_Query($args);

	if( $relatedQuery->have_posts() ) :
		?>
		<div class="related-posts">
			<h2><?php echo __('You may also like...', 'proximis'); ?></h2>
			<ul>
		<?php
			while( $relatedQuery->have_posts() ) : $relatedQuery->the_post(); ?>
			<li>
				<header>
					<?php 
					$author_ID = get_the_author_meta('ID');
					$author_display_name = get_the_author_meta('display_name');
					var_dump($author_display_name);
					$avatar = get_avatar($author_ID);
					$excerpt = get_the_excerpt() ?: get_the_content();
					?>
					<span class="logo-link">
						<?php
						if ($avatar) {
							echo $avatar;
						} 
						?>
						<?php if ($author_display_name): ?>
							<a href="<?php echo get_author_posts_url($author_ID) ?>">
								<?php echo $author_display_name ?>
							</a>
						<?php endif; ?>
					</span>
					<span class="press-date"><?php echo get_the_date('d F Y') ?></span>
				</header>
				<div>
					<h3>
						<a href='<?php the_permalink(); ?>'><?php echo get_the_title(); ?></a>
					</h3>
					<?php if ($excerpt): ?>
						<?php echo force_balance_tags(html_entity_decode(wp_trim_words(htmlentities(wpautop($excerpt)), 24))) ?>
					<?php endif; ?>
					<div class='cats'>
						<?php $cats = get_the_category(); 
							if( $cats ) :
							$count = 0;
							foreach( $cats as $cat ) :
								$count ++;
								if( $count > 1 ) echo ' - ';
								echo '<a href="' . get_category_link( $cat->term_id ) . '">' . $cat->cat_name . '</a>';
							endforeach;
						endif; ?>
					</div>
					<?php echo do_shortcode('[rt_reading_time postfix="min" postfix_singular="min"]'); ?>
				</div>
			</li>
			<?php endwhile;
			?>
			</ul>
		</div>
		<?php
	endif;

	$post = $currentPost;
	wp_reset_query();
?>