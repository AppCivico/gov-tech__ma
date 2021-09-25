<?php

if (!defined('MX_ZIP_KEY')) {
    define('MX_ZIP_NAME', 'ZIP');
    define('MX_ZIP_VER', '4.2.1');
    define('MX_ZIP_KEY', 'mx_zip');
    define('MX_ZIP_AUTHOR', 'Max Lazar');
    define('MX_ZIP_DOCS', 'http://www.eec.ms/add-on/mx-zip');
    define('MX_ZIP_DESC', 'MX Zip');
}

/*
 * < EE 2.6.0 backward compat
 */

if (!function_exists('ee')) {
    function ee()
    {
        static $EE;
        if (!$EE) {
            $EE = get_instance();
        }

        return $EE;
    }
}
