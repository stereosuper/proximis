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

			<?php if( have_rows('travelguides') ) : ?>
				<?php while( have_rows('travelguides') ) : the_row(); ?>
					<?php echo wp_get_attachment_image(get_sub_field('img')); ?>
				<?php endwhile; ?>
			<?php endif; ?>

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
			<section id='offers'>
				<div class='container'>
					<h2><?php the_sub_field('title'); ?></h2>

					<ul>
						<?php if( have_rows('links') ) : ?>
							<?php while( have_rows('links') ) : the_row(); ?>
								<li>
									<?php $link = get_sub_field('link'); ?>
									<a href='<?php echo $link['url']; ?>'><?php echo $link['title']; ?>
										<span><?php the_sub_field('job_type'); ?></span>
										<span><?php the_sub_field('place'); ?></span>
									</a>
								</li>
							<?php endwhile; ?>
						<?php endif; ?>
					</ul>

					<?php the_sub_field('text'); ?>
				</div>
			</section>
		<?php endwhile; ?>
	<?php endif; ?>

	<?php if( have_rows('quotes') ) : ?>
		<div class='container'>
			<ul>
				<?php while( have_rows('quotes') ) : the_row(); ?>
					<li>
						<blockquote>
							<?php the_sub_field('text'); ?>
						</blockquote>
						<p>
							<?php echo wp_get_attachment_image(get_sub_field('img')); ?>
							<?php the_sub_field('name'); ?>
							<?php the_sub_field('job'); ?>
						</p>
					</li>
				<?php endwhile; ?>
			</ul>
		</div>
	<?php endif; ?>
		
<?php endif; ?>

<?php get_footer(); ?>