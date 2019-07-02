<?php 
/*
Template Name: About
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
			<?php if( have_rows('historique') ) : ?>
				<?php while( have_rows('historique') ) : the_row(); ?>
					<h2><?php the_sub_field('title'); ?></h2>
					
					<?php if( have_rows('dates') ) : ?>
						<ul>
							<?php while( have_rows('dates') ) : the_row(); ?>
								<li>
									<?php the_sub_field('year'); ?>
									<?php the_sub_field('text'); ?>
								</li>
							<?php endwhile; ?>
						</ul>
					<?php endif; ?>
				<?php endwhile; ?>
			<?php endif; ?>

			<?php if( have_rows('team') ) : ?>
				<?php while( have_rows('team') ) : the_row(); ?>
					<h2><?php the_sub_field('title'); ?></h2>
					<?php the_sub_field('text'); ?>

					<?php if( have_rows('teams') ) : ?>
						<?php while( have_rows('teams') ) : the_row(); ?>
							<h3><?php the_sub_field('title'); ?></h3>
							<?php if( have_rows('members') ) : ?>
								<ul>
									<?php while( have_rows('members') ) : the_row(); ?>
										<li>
											<?php the_sub_field('name'); ?>
											<?php the_sub_field('job'); ?>
										</li>
									<?php endwhile; ?>
								</ul>
							<?php endif; ?>

						<?php endwhile; ?>
					<?php endif; ?>
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
