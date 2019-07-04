<?php 
/*
Template Name: Services
*/

get_header(); ?>

<div class='container'>

	<?php if ( have_posts() ) : the_post(); ?>
		
		<header>
			<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

			<h1>
				<?php $title = get_field('title'); if( $title ) : ?>
					<span class='<?php echo $title['white1'] ? 'white' : ''; ?>'>
						<?php echo $title['title1']; ?>
					</span>
					<span class='<?php echo $title['white2'] ? 'white' : ''; ?>'>
						<?php echo $title['title2']; ?>
					</span>
				<?php else : the_title(); endif; ?>
			</h1>

			<?php the_field('text'); ?>
		</header>

		<div class='container-small'>
			<?php if( have_rows('columns') ) : ?>
				<?php while( have_rows('columns') ) : the_row(); ?>
					<h2><?php the_sub_field('title'); ?></h2>
					
					<?php the_sub_field('text'); ?>
				<?php endwhile; ?>
			<?php endif; ?>

			<?php $bottom = get_field('bottom'); if( $bottom ) : ?>
				<h2><?php echo $bottom['title']; ?></h2>
				<?php echo $bottom['text']; ?>
			<?php endif; ?>
		</div>
		
	<?php endif; ?>

</div>

<?php get_footer(); ?>
