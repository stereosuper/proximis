<?php
/*
Template Name: Resources
*/

get_header(); ?>

<div class='container wrapper-type'>

	<?php if ( have_posts() ) : the_post(); ?>

		<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

		<div class='container-medium'>
			<h1 class='blog-title'><?php the_title(); ?></h1>

			<?php the_content(); ?>

			<?php $cats = get_terms('resource_cat'); if( $cats ) : ?>
			<ul class='resources-cats'>
				<li><a href=''>Tous</a></li>
				<?php foreach( $cats as $cat ) :
					echo '<li><a href="' . get_category_link( $cat->term_id ) . '">' . $cat->name . '</a></li>';
				endforeach; ?>
			</ul>
			<?php endif; ?>
			
			<div class="wrapper-blog-list">
				<?php $resourcesQuery = new WP_Query(array('post_type' => 'resource', 'posts_per_page' => -1)); if( $resourcesQuery->have_posts() ) : ?>
					<ul class='blog-list'>
						<?php while( $resourcesQuery->have_posts() ) : $resourcesQuery->the_post(); if(get_field('link')) : ?>
							<li class='post'>
								<?php if( get_field('logo') ) : ?>
									<a href='<?php the_field('link'); ?>' target='_blank' rel='noopener noreferrer' class='post-logo' style='background-image:url(<?php the_field('logo'); ?>)'></a>
								<?php elseif( has_post_thumbnail() ) : ?>
									<a href='<?php the_field('link'); ?>' target='_blank' rel='noopener noreferrer' class='post-img' style='background-image:url(<?php the_post_thumbnail_url("medium"); ?>)'></a>
								<?php endif; ?>

								<?php $cats = get_the_terms($post, 'resource_cat'); if( $cats ) :
									echo '<a href="' . get_category_link( $cats[0]->term_id ) . '" class="post-main-cat">' . $cats[0]->name . '</a>';
								endif; ?>

								<a class="post-content-link" href='<?php the_field('link'); ?>' target='_blank' rel='noopener noreferrer'>
									<h2 class="related-title"><?php the_title(); ?></h2>
									<?php the_excerpt(); ?>
								</a>

								<footer class='post-footer'>
									<div class='cats'>
										<?php $cats = get_the_terms($post, 'resource_tag'); if( $cats ) :
											$count = 0;
											foreach( $cats as $cat ) :
												$count ++;
												if( $count > 1 ) echo ', ';
												echo '<a href="' . get_category_link( $cat->term_id ) . '">' . $cat->name . '</a>';
											endforeach;
										endif; ?>
									</div>
								</footer>
							</li>
						<?php endif; endwhile; ?>
					</ul>
				<?php endif; ?>
			</div>
		</div>
		
	<?php endif; ?>

</div>

<?php get_footer(); ?>