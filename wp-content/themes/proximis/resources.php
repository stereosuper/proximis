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
				<li><a href='<?php the_field('link_resources', 'options'); ?>' <?php if(!isset($_GET['cat']) || !$_GET['cat']) echo "class='on'"; ?>><svg class="icon"><use xlink:href="#icon-all"></use></svg><span>Tous</span></a></li>
				<?php foreach( $cats as $cat ) :
					$class = isset($_GET['cat']) && $cat->slug == $_GET['cat'] ? 'class="on"' : '';
					echo '<li><a href="' . get_field('link_resources', 'options') . '?cat=' . $cat->slug . '" ' . $class . '><svg class="icon"><use xlink:href="#icon-' . get_field('icon', 'resource_cat_' . $cat->term_id) . '"></use></svg><span>' . $cat->name . '</span></a></li>';
				endforeach; ?>
			</ul>
			<?php endif; ?>
			
			<div class="wrapper-blog-list">
				<?php
					$args = array('post_type' => 'resource', 'posts_per_page' => 6, 'tax_query' => array(), 'paged' => get_query_var('paged') ? get_query_var('paged') : 1);
					if( isset($_GET['cat']) ){
						$args['tax_query'][] = array('taxonomy' => 'resource_cat', 'field' => 'slug', 'terms' => $_GET['cat']); 
					}
					if( isset($_GET['tag']) ){
						$args['tax_query'][] = array('taxonomy' => 'resource_tag', 'field' => 'slug', 'terms' => $_GET['tag']); 
					}
				?>

				<?php $resourcesQuery = new WP_Query($args); if( $resourcesQuery->have_posts() ) : ?>
					<ul class='blog-list' id='blog'>
						<?php while( $resourcesQuery->have_posts() ) : $resourcesQuery->the_post(); if(get_field('link')) : ?>
							<li class='post'>
								<?php if( get_field('logo') ) : ?>
									<a href='<?php the_field('link'); ?>' target='_blank' rel='noopener noreferrer' class='post-logo' style='background-image:url(<?php the_field('logo'); ?>)'></a>
								<?php elseif( has_post_thumbnail() ) : ?>
									<a href='<?php the_field('link'); ?>' target='_blank' rel='noopener noreferrer' class='post-img' style='background-image:url(<?php the_post_thumbnail_url('large'); ?>)'></a>
								<?php endif; ?>

								<?php $cats = get_the_terms($post, 'resource_cat'); if( $cats ) :
									echo '<a href="' . get_field('link_resources', 'options') . '?cat=' . $cats[0]->slug . '" class="post-main-cat"><svg class="icon"><use xlink:href="#icon-' . get_field('icon', 'resource_cat_' . $cats[0]->term_id) . '"></use></svg>' . $cats[0]->name . '</a>';
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
												echo '<a href="' . get_field('link_resources', 'options') . '?tag=' . $cat->slug . '">' . $cat->name . '</a>';
											endforeach;
										endif; ?>
									</div>
								</footer>
							</li>
						<?php endif; endwhile; ?>
					</ul>

					<div class='pagination'>
						<?php echo paginate_links(
							array(
								'prev_next' => false,
								'end_size' => 2,
								'current' => max( 1, get_query_var('paged') ),
								'total' => $resourcesQuery->max_num_pages
							)
						); ?>
					</div>
				<?php endif; ?>
			</div>
		</div>
		
	<?php endif; ?>

</div>

<?php get_footer(); ?>