<article class="container-ref">
    <div class="container ref-first-part wrapper-collant">
        <div class="container-small">
            <div class="wrapper-ref-illus">
                <?php echo wp_get_attachment_image(get_field('img'), 'medium'); ?>
            </div>
            <div class="wrapper-btn-infos" id="btn-infos">
                <div class="content-btn-infos">
                    <div class="nav-btn">
                        <button type="button" class="btn-hexagon animated js-button-hexagon">
                            <span class="hexagon"></span>
                            <svg class="icon icon-small-arrow prev"><use xlink:href="#icon-small-arrow"></use></svg>
                        </button>
                        <button type="button" class="btn-hexagon animated js-button-hexagon">
                            <span class="hexagon"></span>
                            <svg class="icon icon-small-arrow next"><use xlink:href="#icon-small-arrow"></use></svg>
                        </button>
                    </div>
                    <?php if( get_field('pdf') ) : ?>
                        <div class="wrapper-btn-download">
                            <div class="content-btn-download">
                                <a class="btn-hexagon animated btn-download" href="<?php the_field('pdf'); ?>"">
                                    <span class="hexagon"></span>
                                    <svg class="icon icon-download"><use xlink:href="#icon-download"></use></svg>
                                    <span class="visually-hidden"><?php _e('Télécharger'); ?></span>
                                </a>
                            </div>
                        </div>
                    <?php endif; ?>
                    <div class="infos-datas">
                        <h1 class="title-ref"><?php the_title(); ?></h1>
                        <?php if( have_rows('datas') ) : ?>
                            <?php while( have_rows('datas') ) : the_row(); ?>
                                <div class="wrapper-data">
                                    <div class="data-number"><span><?php the_sub_field('number'); ?></span></div>
                                    <p class="data-text"><?php the_sub_field('text'); ?></p>
                                </div>
                            <?php endwhile; ?>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
            <?php the_content(); ?>
        </div>
    </div>
    <div class="container">
        <div class="container-small">
            <div class="wrapper-results-awards">
                <?php if( have_rows('results') ) : ?>
                    <div class="results title-text">
                        <?php while( have_rows('results') ) : the_row(); ?>
                            <h3 class="use-case-title"><?php the_sub_field('results_title'); ?></h3>
                            <div class="use-case-content"><?php the_sub_field('results_text') ?></div>
                        <?php endwhile; ?>
                    </div>
                <?php endif; ?>
                <?php if( have_rows('awards') ) : ?>
                    <div class="awards">
                        <h3><?php the_field('awards_title'); ?></h3>
                        <ul>
                            <?php while( have_rows('awards') ) : the_row(); ?>
                                <li>
                                    <h4 class="award-name"><?php the_sub_field('name'); ?></h4>
                                    <time class="award-year"><?php the_sub_field('year'); ?></time>
                                    <p class="award-desc"><?php the_sub_field('text'); ?></p>
                                </li>
                            <?php endwhile; ?>
                        </ul>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</article>