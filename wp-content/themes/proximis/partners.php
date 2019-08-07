<?php
/*
Template Name: Partners
*/

get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

		<div class='container-medium'>
			<h1 class='small-margin-bottom'><?php the_title(); ?></h1>
			<?php the_content(); ?>
		</div>

		<?php if( have_rows('partners') ) : ?>
			<ul class="partners">
				<?php while( have_rows('partners') ) : the_row(); ?>
					<li>
						<div class="img">
							<?php echo wp_get_attachment_image(get_sub_field('logo')); ?>
						</div>
						<div class="text">
							<?php $link = get_sub_field('link'); ?>
							<div class="partner-name"><?php the_sub_field('name'); ?></div>
							<?php if( $link ) : ?>
								<a href='<?php echo $link['url']; ?>'><?php echo $link['title']; ?></a>
							<?php endif; ?>
							<p><?php the_sub_field('text'); ?></p>
							<?php if( $link ) : ?>
								<a href='<?php echo $link['url']; ?>' class='link'>
									<span><?php _e('Learn more', 'proximis'); ?></span><i></i>
								</a>
							<?php endif; ?>
						</div>
					</li>
				<?php endwhile; ?>
			</ul>
		<?php endif; ?>

		<?php $form = get_field('form'); if( $form ) : ?>
			<div class="wrapper-partner-form">
				<div class="title">
					<h2 class="h1"><?php echo $form['title']; ?></h2>
					<?php echo $form['text']; ?>
				</div>
				<div class="wrapper-form align-items-form">
					<?php echo do_shortcode($form['shortcode']); ?>
				</div>
			</div>
		<?php endif; ?>
		
	<?php endif; ?>

</div>

<?php get_footer(); ?>