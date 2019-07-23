<?php

/**
 * Book Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'book-' . $block['id'];
if( !empty($block['anchor']) ){
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'book book-highlighted';
if( !empty($block['className']) ){
    $className .= ' ' . $block['className'];
}
// if( !empty($block['align']) ) {
//     $className .= ' align' . $block['align'];
// }

// Load values and assing defaults.
$book = get_field('book');

?>
<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>" data-io="highlighted">
    <span class="line"></span>
    <?php echo wp_get_attachment_image($book['img'], 'medium'); ?>
    <h2><?php echo $book['title']; ?></h2>
    <p><?php echo $book['text']; ?></p>
    <a href='<?php echo $book['link']['url']; ?>' class='btn big'><?php echo $book['link']['title']; ?></a>
</div>