<?php get_header(); ?>

<div class='container'>

	<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

	<h1>404</h1>

	<div class='container-tiny'><?php _e('Page not found'); ?></div>

</div>

<?php get_footer(); ?>