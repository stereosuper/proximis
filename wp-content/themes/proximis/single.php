<?php get_header(); ?>

<article class='container'>

	<?php if ( have_posts() ) : the_post(); $thumbnail = has_post_thumbnail(); ?>

		<?php if( function_exists('yoast_breadcrumb') ){ yoast_breadcrumb( '<p id="breadcrumbs" class="breadcrumbs">','</p>' ); } ?>

		<h1 class='blog-title'><?php the_title(); ?></h1>
		<p class='post-meta'>
			<time><?php echo get_the_date(); ?></time>
			<?php echo do_shortcode('[rt_reading_time postfix="min"]'); ?>
			<span class='cats'>
				<?php $cats = get_the_category(); if( $cats ) :
					$count = 0;
					foreach( $cats as $cat ) :
						$count ++;
						if( $count > 1 ) echo ', ';
						echo '<a href="' . get_category_link( $cat->term_id ) . '">' . $cat->cat_name . '</a>';
					endforeach;
				endif; ?>
			</span>
		</p>
		
		<?php if( $thumbnail ) : ?>
			<div class='post-thumbnail'>
				<?php the_post_thumbnail('full'); ?>
			</div>
		<?php endif; ?>

		<div class='container-tiny <?php if( $thumbnail ) echo "has-thumbnail"; ?>'>
			<?php the_content(); ?>

			<?php $author = get_the_author(); ?>
			<p class='post-author'>
				<a href='<?php get_the_author_link(); ?>'>
					<span class='img'><?php echo get_avatar( $author ); ?></span>
					<?php echo $author; ?>
				</a>
			</p>

			<div class='newsletter'>
				<div class='text'>
					<h2><?php the_field('title_news', 'options'); ?></h2>
					<p><?php the_field('text_news', 'options'); ?></p>
				</div>
				<?php echo do_shortcode('[contact-form-7 id="250" title="Newsletter"]'); ?>
			</div>
		</div>
		
	<?php endif; ?>

</article>

<?php get_footer(); ?>
