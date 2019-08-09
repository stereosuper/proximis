<?php get_header(); ?>

<article class='container job-wrapper'>

	<?php if ( have_posts() ) : the_post(); $thumbnail = has_post_thumbnail(); ?>

		<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

		<h1><?php the_title(); ?></h1>

		<div class='container-tiny'>
			<?php the_content(); ?>
		</div>

		<?php if( get_field('mail') ) : ?>
			<div class="highlighted" data-io="highlighted" id="job-mail">
				<span class="line"></span>
				<?php the_field('mail'); ?>
			</div>
		<?php endif; ?>
		
	<?php endif; ?>

</article>

<?php get_footer(); ?>
