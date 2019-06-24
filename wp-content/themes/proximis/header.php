<!DOCTYPE html>

<html <?php language_attributes(); ?> class='no-js'>
	<head>
		<meta charset='utf-8'>
		<meta name='viewport' content='width=device-width,initial-scale=1'>
		<meta name='format-detection' content='telephone=no'>

		<link rel='alternate' type='application/rss+xml' title='<?php echo get_bloginfo('sitename') ?> Feed' href='<?php echo get_bloginfo('rss2_url') ?>'>

		<?php wp_head(); ?>

		<script>document.getElementsByTagName('html')[0].className = 'js';</script>
	</head>

	<body <?php body_class(); ?>>

		<div class='wrapper'>

			<header role='banner' class='header container'>

				<a href='<?php echo home_url('/'); ?>' title='<?php bloginfo( 'name' ); ?>' rel='home' class='logo'><?php bloginfo( 'name' ); ?></a>

				<button type='button' class='burger' id='burger'>
					<span class='visually-hidden'>Menu</span>
					<div class='burger-icon'></div>
				</button>

				<nav role='navigation' class='nav'>
					<button type='button' class='close-menu' id='close-menu'>
						<span class='visually-hidden'><?php _e('Close menu', 'proximis'); ?></span>
					</button>

					<a href='<?php echo home_url('/'); ?>' title='<?php bloginfo( 'name' ); ?>' rel='home' class='logo-menu'><?php bloginfo( 'name' ); ?></a>

					<?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'menu_class' => 'menu-main' ) ); ?>

					<?php $btn = get_field('contact', 'options'); if( $btn ) : ?>
						<a href='<?php echo $btn['url'] ?>' class='btn'><?php echo $btn['title']; ?></a>
					<?php endif; ?>
				</nav>

			</header>

			<main role='main' class='main'>
