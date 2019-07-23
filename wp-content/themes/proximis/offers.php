<?php
/*
Template Name: Offers
*/

get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>

	<div class='container'>

		<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>
		
		<div class='container-medium'>
			<h1><?php the_title(); ?></h1>

			<?php the_content(); ?>

			<?php if( have_rows('values') ) : ?>
				<?php while( have_rows('values') ) : the_row(); ?>
					<div>
						<h2><?php the_sub_field('title'); ?></h2>
						<p><?php the_sub_field('text'); ?></p>

						<?php if( have_rows('cols') ) : ?>
							<?php while( have_rows('cols') ) : the_row(); ?>
								<div>
									<h3><?php the_sub_field('title'); ?></h3>
									<?php the_sub_field('text'); ?>
								</div>
							<?php endwhile; ?>
						<?php endif; ?>
					</div>
				<?php endwhile; ?>
			<?php endif; ?>
		</div>
	</div>

	<?php if( have_rows('offers') ) : ?>
		<?php while( have_rows('offers') ) : the_row(); ?>
			<section>
				<div class='container'>
					<h2><?php the_sub_field('title'); ?></h2>

					<?php the_sub_field('text'); ?>
				</div>
			</section>
		<?php endwhile; ?>
	<?php endif; ?>
		
<?php endif; ?>

<?php get_footer(); ?>