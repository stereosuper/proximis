<?php get_header(); ?>

<div class='container'>

	<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

	<?php $e404 = get_field('404', 'options'); ?>

	<h1><?php echo $e404['title']; ?></h1>

	<div class='container-tiny'>
		<?php echo $e404['text']; ?>
	</div>

</div>

<?php get_footer(); ?>