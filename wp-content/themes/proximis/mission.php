<?php
/*
Template Name: Mission
*/

get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>

	<?php get_template_part('includes/header-page'); ?>

	<div class='container mission'>
		<?php if( have_rows('section1') ) : while( have_rows('section1') ) : the_row(); ?>
			<section class='mission-section'>
				<div class='container-tiny'>
					<h2><?php the_sub_field('title'); ?></h2>
					<div class='big-text'><?php the_sub_field('text'); ?></div>
					<div class='cols-text'><?php the_sub_field('columns'); ?></div>
				</div>
				<?php if( have_rows('examples') ) : ?>
					<div class='examples'>
						<?php while( have_rows('examples') ) : the_row(); ?>
							<div class='example'>
								<h3><?php the_sub_field('title'); ?></h3>
								<p><?php the_sub_field('text'); ?></p>
							</div>
						<?php endwhile; ?>
					</div>
				<?php endif; ?>
				<div class='container-tiny'>
					<?php the_sub_field('text2'); ?>
					<?php if( have_rows('links') ) : ?>
						<p class='mission-title'><?php _e('For further information...', 'proximis'); ?></p>
						<div class='mission-links'>
							<?php while( have_rows('links') ) : the_row(); ?>
								<?php $link = get_sub_field('link'); ?>
								<a href='<?php echo $link['url']; ?>' class='mission-link'>
									<span class='sup-title'><?php the_sub_field('cat'); ?></span>
									<span class='title'><?php the_sub_field('title'); ?></span>
									<span class='link small'>
										<span><?php echo $link['title']; ?></span><i></i>
									</span>
								</a>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			</section>
		<?php endwhile; endif; ?>
	</div>

	<?php get_template_part('includes/footer-page'); ?>
		
<?php endif; ?>

<?php get_footer(); ?>