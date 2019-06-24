            </main>

            <footer role='contentinfo' class='footer'>
                <div class='container'>
                    <div class='footer-big'>
                        <p>
                            <span class='footer-title'><?php the_field('footerTitle', 'options'); ?></span>
                            <?php $link = get_field('footerLink', 'options'); if( $link ) : ?>
                                <a href='<?php echo $link['url'] ?>' class='link'>
                                    <?php echo $link['title']; ?><svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                                </a>
                            <?php endif; ?>
                        </p>

                        <p>
                            <?php the_field('footerTextSmall', 'options'); ?>
                            <?php $link = get_field('footerLinkSmall', 'options'); if( $link ) : ?>
                                <a href='<?php echo $link['url'] ?>' class='link'>
                                    <?php echo $link['title']; ?><svg class='icon'><use xlink:href='#icon-arrow'></use></svg>
                                </a>
                            <?php endif; ?>
                        </p>
                    </div>

                    <div class='footer-small'>
                        <?php if( have_rows('networks', 'options') ) : ?>
                            <ul class='footer-social'>
                                <?php while( have_rows('networks', 'options') ) : the_row(); ?>
                                    <li>
                                        <a href='<?php the_sub_field('link'); ?>' target='_blank' rel='noreferrer noopener'>
                                            <span class='visually-hidden'><?php the_sub_field('name'); ?></span>
                                            <svg class='icon'><use xlink:href='#icon-<?php the_sub_field('icon'); ?>'></use></svg>
                                        </a>
                                    </li>
                                <?php endwhile; ?>
                            </ul>
                        <?php endif; ?>
                        <p><?php the_field('footerTextSmall2', 'options'); ?></p>
                        <?php if( have_rows('footerLinks', 'options') ) : ?>
                            <ul class='footer-menu'>
                                <?php while( have_rows('footerLinks', 'options') ) : the_row(); ?>
                                    <?php $link = get_sub_field('link'); if( $link ) : ?>
                                        <li>
                                            <a href='<?php echo $link['url'] ?>' class='link'><?php echo $link['title']; ?></a>
                                        </li>
                                    <?php endif; ?>
                                <?php endwhile; ?>
                            </ul>
                        <?php endif; ?>
                    </div>
                </div>
            </footer>
        </div>

        <svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <symbol id="icon-fb" viewBox="0 0 17 32">
                    <title>Facebook</title>
                    <path d="M15.585 6.083v-6.083h-5.309c-4.282 0-6.508 2.259-6.508 6.083v4.866h-3.768v6.604h3.768v14.425h6.508v-14.425h4.795l0.514-6.604h-5.309v-2.085c0-1.39 0.342-2.781 2.398-2.781h2.911z"></path>
                </symbol>
                <symbol id="icon-in" viewBox="0 0 34 32">
                    <title>LinkedIn</title>
                    <path d="M33.118 31.549h-7.333v-11.919c0-1.928-2.129-3.33-4.021-3.33s-3.312 1.577-3.312 3.33v11.919h-7.333v-21.033h7.333v3.505c1.183-1.928 4.258-3.155 6.387-3.155 4.495 0 8.279 3.505 8.279 7.887v12.795zM7.333 31.549h-7.333v-21.033h7.333v21.033zM3.785 0c2.129 0 3.785 1.577 3.785 3.505s-1.892 3.505-3.785 3.505c-1.892 0-3.785-1.577-3.785-3.505s1.656-3.505 3.785-3.505z"></path>
                </symbol>
                <symbol id="icon-tw" viewBox="0 0 38 32">
                    <title>Twitter</title>
                    <path d="M37.849 3.712c-1.449 0.557-2.898 1.114-4.527 1.299 1.63-0.928 2.897-2.598 3.441-4.454-1.449 0.928-3.079 1.485-4.89 1.856-1.449-1.485-3.441-2.413-5.614-2.413-4.346 0-7.787 3.526-7.787 7.98 0 0.557 0 1.299 0.181 1.856-6.519-0.371-12.133-3.526-15.936-8.351-0.724 1.114-1.087 2.598-1.087 3.897 0 2.784 1.449 5.196 3.441 6.681-1.268 0-2.535-0.371-3.622-0.928 0 0 0 0 0 0.186 0 3.897 2.716 7.052 6.157 7.794-0.724 0.186-1.268 0.371-1.992 0.371-0.543 0-0.905 0-1.449-0.186 0.905 3.155 3.803 5.382 7.244 5.568-2.535 1.856-5.976 3.155-9.598 3.155-0.543 0-1.268 0-1.811-0.186 3.441 2.413 7.606 3.712 11.952 3.712 14.306 0 22.094-12.063 22.094-22.641 0-0.371 0-0.742 0-1.114 1.449-1.114 2.716-2.413 3.803-4.083z"></path>
                </symbol>
                <symbol id="icon-yt" viewBox="0 0 45 32">
                    <title>YouTube</title>
                    <path d="M43.273 5.772c-0.508-1.913-2.004-3.42-3.904-3.93-3.446-0.932-17.261-0.932-17.261-0.932s-13.816 0-17.261 0.932c-1.9 0.51-3.399 2.019-3.904 3.93-0.924 3.469-0.924 10.701-0.924 10.701s0 7.233 0.924 10.701c0.507 1.913 2.004 3.357 3.904 3.868 3.445 0.929 17.261 0.929 17.261 0.929s13.813 0 17.261-0.932c1.9-0.51 3.396-1.955 3.904-3.868 0.924-3.469 0.924-10.704 0.924-10.704s0-7.235-0.924-10.701v0.005zM17.59 23.043v-13.137l11.545 6.57-11.545 6.567z"></path>
                </symbol>
                <symbol id="icon-arrow" viewBox="0 0 32 32">
                    <path d="M30.817 15.408l-12.453-9.64 0 8.021-15.126-0c-0.894-0-1.619 0.725-1.619 1.619s0.725 1.619 1.619 1.619l15.126 0 0 8.020 12.453-9.639z"></path>
                </symbol>
            </defs>
        </svg>

        <?php wp_footer(); ?>

        </body>
    </html>
