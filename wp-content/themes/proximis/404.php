<?php get_header(); ?>

<div class='container'>
	<?php 
	if (function_exists('yoast_breadcrumb')) { 
		yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' );
	} 
	?>
	<?php $e404 = get_field('404', 'options'); ?>
	<div>
		<h1 class="title">
			<p class="title-part"><?php echo $e404['title_first_part']; ?></p>
			<?php echo $e404['title_second_part']; ?>
			<p class="title-part"><?php echo $e404['title_third_part']; ?></p>
		</h1>
		<div class="error-404-image-wrapper js-error-404-image-wrapper">
		<?php 
		echo wp_get_attachment_image($e404['img'], 'full', '', array(
			'class' => 'error-404-image'
		)); 
		?>
		</div>
	</div>
	<div class="content">
		<?php echo $e404['text']; ?>
	</div>
</div>

<?php get_footer(); ?>