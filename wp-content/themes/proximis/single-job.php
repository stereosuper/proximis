<?php get_header(); ?>

<article class='container'>

	<?php if ( have_posts() ) : the_post(); $thumbnail = has_post_thumbnail(); ?>

		<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

		<h1><?php the_title(); ?></h1>

		<div class='container-tiny'>
			<?php the_content(); ?>
		</div>
		
	<?php endif; ?>

</article>

<?php get_footer(); ?>
