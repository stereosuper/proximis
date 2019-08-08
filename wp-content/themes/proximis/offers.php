<?php
/*
Template Name: Offers
*/

get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>

	<div class='container'>

		<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>
		
		<div class="hero-offers">
			<div class="intro">
				<h1><?php the_title(); ?></h1>
				<?php the_content(); ?>
			</div>
			<ul class="travel-guides">
				<?php if( have_rows('travelguides') ) : ?>
					<?php while( have_rows('travelguides') ) : the_row(); ?>
						<li>
							<?php echo wp_get_attachment_image(get_sub_field('img'), 'full'); ?>
						</li>
					<?php endwhile; ?>
				<?php endif; ?>
			</ul>
		</div>

		<?php if( have_rows('values') ) : ?>
			<?php while( have_rows('values') ) : the_row(); ?>
				<div class="values">
					<h2><?php the_sub_field('title'); ?></h2>
					<p><?php the_sub_field('text'); ?></p>

					<?php if( have_rows('cols') ) : ?>
						<div class="wrapper-values">
							<?php while( have_rows('cols') ) : the_row(); ?>
								<div>
									<h3><?php the_sub_field('title'); ?></h3>
									<?php the_sub_field('text'); ?>
								</div>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			<?php endwhile; ?>
		<?php endif; ?>
	</div>

	<?php if( have_rows('offers') ) : ?>
		<?php while( have_rows('offers') ) : the_row(); ?>
			<section id='offers'>
				<div class='container'>
					<div class='container-xsmall'>
						<h2 class='h1'><?php the_sub_field('title'); ?></h2>

						<?php $jobQuery = new WP_Query(array('post_type' => 'job', 'posts_per_page' => -1)); if( $jobQuery->have_posts() ) : ?>
							<ul class='offers-list'>
								<?php while( $jobQuery->have_posts() ) : $jobQuery->the_post(); ?>
									<li>
										<a class='job-offer' href='<?php the_permalink(); ?>'>
											<span class='job-title'><?php the_title(); ?></span>
											<span class='job-details'>
												<span class='job-type'><?php the_field('contract'); ?></span>
												<span class='job-place'><?php the_field('place'); ?></span>
												<span class='wrapper-job-more'>
													<span class="btn-hexagon small">
														<span class="hexagon"></span><span class="plus"></span>
													</span>
												</span>
											</span>
										</a>
									</li>
								<?php endwhile; ?>
							</ul>
						<?php wp_reset_postdata(); endif; ?>

						<div class='offers-desc'><?php the_sub_field('text'); ?></div>
					</div>
				</div>
			</section>
		<?php endwhile; ?>
	<?php endif; ?>

	<?php if( have_rows('quotes') ) : ?>
		<div class='container'>
			<ul class='team-testimonials'>
				<?php while( have_rows('quotes') ) : the_row(); ?>
					<li>
						<blockquote><?php the_sub_field('text'); ?></blockquote>
						<div class="team-member">
							<div class="img">
								<?php echo wp_get_attachment_image(get_sub_field('photo')); ?>
							</div>
							<p>
								<strong><?php the_sub_field('name'); ?></strong>
								<span><?php the_sub_field('job'); ?></span>
							</p>
						</div>
					</li>
				<?php endwhile; ?>
			</ul>
		</div>
	<?php endif; ?>
		
<?php endif; ?>

<?php get_footer(); ?>