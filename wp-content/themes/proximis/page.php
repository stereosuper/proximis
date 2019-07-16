<?php get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>

		<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

		<h1><?php the_title(); ?></h1>

		<div class='container-tiny'><?php the_content(); ?></div>
		
	<?php endif; ?>

</div>

<?php get_footer(); ?>