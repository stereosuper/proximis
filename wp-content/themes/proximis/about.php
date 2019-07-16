<?php 
/*
Template Name: About
*/

get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>
		
	<?php get_template_part('includes/header-page'); ?>

	<section class='container'>
		<div class='container-small timeline-wrapper'>
			<?php if( have_rows('historique') ) : ?>
				<?php while( have_rows('historique') ) : the_row(); ?>
					<h2 class='h1'><?php the_sub_field('title'); ?></h2>

					<?php if( have_rows('dates') ) : ?>
						<ul class='timeline'>
							<?php while( have_rows('dates') ) : the_row(); ?>
								<li>
									<time><?php the_sub_field('year'); ?></time>
									<?php the_sub_field('text'); ?>
								</li>
							<?php endwhile; ?>
						</ul>
					<?php endif; ?>
				<?php endwhile; ?>
			<?php endif; ?>
		</div>
	</section>

	<section class='team-wrapper'>
		<div class='container'>
			<?php if( have_rows('team') ) : ?>
				<?php while( have_rows('team') ) : the_row(); ?>
					<h2 class='h1'><?php the_sub_field('title'); ?></h2>
					<?php the_sub_field('text'); ?>

					<?php if( have_rows('teams') ) : ?>
						<?php while( have_rows('teams') ) : the_row(); ?>
							<div class='team'>
								<h3><?php the_sub_field('title'); ?></h3>
								<?php if( have_rows('members') ) : ?>
									<ul>
										<?php while( have_rows('members') ) : the_row(); ?>
											<li>
												<div class='img'>
													<?php echo wp_get_attachment_image(get_sub_field('photo')); ?>
												</div>
												<p>
													<strong><?php the_sub_field('name'); ?></strong>
													<span><?php the_sub_field('job'); ?></span>
													<?php if( get_sub_field('twitter') ) : ?>
														<a href='<?php the_sub_field('twitter'); ?>' rel='noreferrer noopener'>Twitter</a>
													<?php endif; ?>
													<?php if( get_sub_field('linkedin') ) : ?>
														<a href='<?php the_sub_field('linkedin'); ?>' rel='noreferrer noopener'>Linkedin</a>
													<?php endif; ?>
												</p>
											</li>
										<?php endwhile; ?>
									</ul>
								<?php endif; ?>
							</div>
						<?php endwhile; ?>
					<?php endif; ?>
				<?php endwhile; ?>
			<?php endif; ?>
		</div>
	</section>

	<?php get_template_part('includes/footer-page'); ?>
		
<?php endif; ?>

<?php get_footer(); ?>
