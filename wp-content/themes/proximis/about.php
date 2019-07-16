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

	<section class='team'>
		<div class='container'>
			<div class='container-small'>
				<?php if( have_rows('team') ) : ?>
					<?php while( have_rows('team') ) : the_row(); ?>
						<h2><?php the_sub_field('title'); ?></h2>
						<?php the_sub_field('text'); ?>

						<?php if( have_rows('teams') ) : ?>
							<?php while( have_rows('teams') ) : the_row(); ?>
								<h3><?php the_sub_field('title'); ?></h3>
								<?php if( have_rows('members') ) : ?>
									<ul>
										<?php while( have_rows('members') ) : the_row(); ?>
											<li>
												<?php the_sub_field('name'); ?>
												<?php the_sub_field('job'); ?>
											</li>
										<?php endwhile; ?>
									</ul>
								<?php endif; ?>

							<?php endwhile; ?>
						<?php endif; ?>
					<?php endwhile; ?>
				<?php endif; ?>
			</div>
		</div>
	</section>

	<?php get_template_part('includes/footer-page'); ?>
		
<?php endif; ?>

<?php get_footer(); ?>
