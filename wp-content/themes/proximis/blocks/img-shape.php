<?php

/**
 * Img shape Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'img-shape-' . $block['id'];
if( !empty($block['anchor']) ){
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'img-shape';
if( !empty($block['className']) ){
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ){
    $className .= ' align' . $block['align'];
}

// Load values and assing defaults.
$img = get_field('img');

echo wp_get_attachment_image($img, 'full', '', array('class' => $className, 'style' => "shape-outside: url('" . wp_get_attachment_image_src($img, 'full')[0] . "')"));

?>