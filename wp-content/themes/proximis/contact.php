<?php 
/*
Template Name: Contact
*/

get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>
		
		<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

		<div class='container-small'>

			<h1><?php the_title(); ?></h1>
			<?php the_content(); ?>

		</div>
		
	<?php endif; ?>

</div>

<?php get_footer(); ?>
