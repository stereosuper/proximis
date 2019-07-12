<?php 
/*
Template Name: Services
*/

get_header(); ?>

<?php if ( have_posts() ) : the_post(); ?>
		
	<header class='header-page'>
		<div class='container'>
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
		</div>
		<?php the_post_thumbnail('full'); ?>
	</header>

	<section class='container services'>
		<?php if( have_rows('columns') ) : ?>
			<?php while( have_rows('columns') ) : the_row(); ?>
				<div>
					<h2><?php the_sub_field('title'); ?></h2>
					<?php the_sub_field('text'); ?>
				</div>
			<?php endwhile; ?>
		<?php endif; ?>
	</section>

	<footer class='footer-page'>
		<div class='container'>
			<?php $bottom = get_field('bottom'); if( $bottom ) : ?>
				<h2><?php echo $bottom['title']; ?></h2>
				<?php echo $bottom['text']; ?>
				<?php if( $bottom['link'] ) : ?>
					<p><a href="<?php echo $bottom['link']['url']; ?>" class='link'><span><?php echo $bottom['link']['title']; ?></span><i></i></a></p>
				<?php endif; ?>
			<?php endif; ?>
		</div>
	</footer>
		
<?php endif; ?>

<?php get_footer(); ?>
