<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/*
|--------------------------------------------------------------------------
| Load Manifest
|--------------------------------------------------------------------------
|
|
*/
require_once(SYSPATH . 'user/addons/manifest/mod.manifest.php');

Manifest::load();

/**
 * @see  https://gist.github.com/464756
 */
global $assign_to_config; // Make this global so we can add some of the config variables here

// make sure our global vars config exists
if (!isset($assign_to_config['global_vars'])) {
    $assign_to_config['global_vars'] = array(); // This array must be associative
}

// $protocol = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") ? "https://" : "http://";
$protocol = "https://";
$port = isset($_SERVER["SERVER_PORT"]) ? $_SERVER["SERVER_PORT"] : 80;

/**
 * @see https://stackoverflow.com/a/42387790
 */
if (isset($_SERVER['HTTP_CF_VISITOR'])) {
    $cf_visitor = json_decode($_SERVER['HTTP_CF_VISITOR']);

    if (isset($cf_visitor->scheme) && 'https' == $cf_visitor->scheme) {
        $protocol = 'https://';
    }
}

$strict_urls = 'n';

/**
 * @see https://ellislab.com/blog/entry/http-host-and-server-name-security-issues
 */
$site_name = '';
$cp_url = '/admin.php';
$domain = $_SERVER['HTTP_HOST'];

$domains = include('domains.php');

foreach ($domains as $site) {
    if (in_array(preg_replace("/www\d*\./", '', $domain), $site['hosts'])) {
        $site_name = $site['site_name'];
        $assign_to_config['global_vars']['global:editorial-group'] = $site['editorial_group'];
        break;
    }
}

switch (true) {
    case (strpos($domain, 'localhost') !== false):
    case (strpos($domain, '.local') !== false):
        $assign_to_config['global_vars']['global:root-site-url'] = '//ma.gov.local';
        break;

    case (strpos($domain, 'appcivico') !== false):
        $assign_to_config['global_vars']['global:root-site-url'] = 'https://ma.appcivico.com.br';
        break;

    default:
        $assign_to_config['global_vars']['global:root-site-url'] = 'https://ma.gov.br';
        break;
}
$site_url = ($port !== '443' && $port !== '80') ? $protocol . $domain . ':' . $port : $protocol . $domain;

$assign_to_config['site_name'] = $site_name;
$assign_to_config['cp_url']    = $site_url . $cp_url;
$assign_to_config['site_url']  = $site_url;
$config['index_page'] = Manifest::get('INDEX_PAGE', '');
$config['site_index'] = Manifest::get('SITE_INDEX', '');

// ExpressionEngine Config Items
// Find more configs and overrides at
// https://docs.expressionengine.com/latest/general/system-configuration-overrides.html

$config['app_version'] = '6.0.6';
$config['encryption_key'] = Manifest::get('ENCRYPTION_KEY', '90c1e6d60d21c0691882686407a4641f6cd6c4bf');
$config['session_crypt_key'] = Manifest::get('SESSION_CRYPT_KEY', '691b97ef2c0cbe431e448db295323337847f0330');
$config['database'] = array(
    'expressionengine' => array(
        'hostname' => Manifest::get('DATABASE_HOST', ''),
        'database' => Manifest::get('DATABASE_NAME', ''),
        'username' => Manifest::get('DATABASE_USER', ''),
        'password' => Manifest::get('DATABASE_PASS', ''),
        'dbprefix' => 'exp_',
        'char_set' => 'utf8mb4',
        'dbcollat' => 'utf8mb4_unicode_ci',
        'port'     => ''
    ),
);

$config['allow_avatar_uploads'] = 'y';
$config['allow_member_localization'] = 'n';
$config['allow_member_registration'] = 'n';
$config['allow_multi_logins'] = 'y';
$config['allow_php'] = 'n';
$config['allow_signatures'] = 'y';
$config['allow_textarea_tabs'] = 'n';
$config['allow_username_change'] = 'n';
$config['auto_assign_cat_parents'] = 'n';
$config['avatar_max_height'] = '512';
$config['avatar_max_kb'] = '200';
$config['avatar_max_width'] = '512';
$config['avatar_path'] = '/var/www/html/images/avatars/'; // docker volume path
$config['avatar_url'] = '/images/avatars';
$config['base_path'] = Manifest::get('BASE_PATH', '/var/www/html/'); // docker volume path
$config['cache_driver'] = Manifest::get('CACHE_DRIVER', 'file');
$config['captcha_url'] = '/images/captchas';
$config['cookie_domain'] = $domain;
$config['cookie_prefix'] = 'ma_';
$config['cookie_samesite'] = 'Strict';

$config['css_js_settings'] = [
    'js' =>
    '(function() {
        var bidingTypeField = document.querySelector("[name=field_id_49]");
        var comprasNetField = document.querySelector("[name=field_id_50]");

        if(!bidingTypeField || !comprasNetField) return;

        var comprasNetFieldset = comprasNetField.closest("fieldset");

        $("form").on("interact", function(e) {
            if(e.target.name !== "field_id_49") return;
            var value = e.target.value;
            if (value.toLowerCase() === "pregão eletrônico") {
              comprasNetFieldset.classList.remove("hidden");
            } else {
              comprasNetFieldset.classList.add("hidden");
            }
        });
    })()',
    'css' => '
        .dashboard::before {
            content: url("/assets/images/brand/gov__ma.svg");
            display: block;
            grid-column: 2/-2;
            margin-right: auto;
            margin-left: auto;
        }
        .beta-welcome-banner {
            display: none;
        }

        /* RTE */
        .ck .ck-content .image-style-side {
            float: left;
            clear: none;
            margin-left: 0;
            margin-right: var(--ck-image-style-spacing);
        }

        /* Relationship field */
        // .dropdown,
        // .select__dropdown {
        //     overflow: visible;
        // }

        .grid-multi-relate .button__within-dropdown,
        .grid-multi-relate .dropdown__link,
        .grid-multi-relate .select__dropdown-item,
        .grid-relate .button__within-dropdown,
        .grid-relate .dropdown__link,
        .grid-relate .select__dropdown-item {
            display: block;

            overflow: hidden;

            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .dropdown__link-right {
            max-width: 100%;
        }
    ',
    'enable' => true
];

$config['date_format'] = '%j/%n/%Y';
$config['debug'] = Manifest::get('DEBUG', '1');
$config['default_member_group'] = '4';
$config['default_site_timezone'] = 'America/Sao_Paulo';
$config['deft_lang'] = 'portuguese';
$config['disable_csrf_protection'] = 'y';
$config['emoticon_url'] = '/images/smileys';
$config['enable_censoring'] = 'y';
$config['enable_hit_tracking'] = 'n';
$config['enable_template_routes'] = 'y';
$config['filename_increment'] = 'y';
$config['force_redirect'] = 'y';
$config['hidden_template_404'] = 'y';
$config['htaccess_path'] = '/var/www/html/.htaccess';
$config['ignore_entry_stats'] = 'n';
$config['multiple_sites_enabled'] = 'y';
$config['mail_protocol'] = 'smtp';
$config['email_smtp_crypto'] = 'ssl';
$config['smtp_password'] = Manifest::get('SMTP_PASSWORD', '465');
$config['smtp_port'] = Manifest::get('SMTP_PORT', '465');
$config['smtp_server'] = Manifest::get('SMTP_HOST', '465');
$config['smtp_username'] = Manifest::get('SMTP_USER', '');

$config['profile_trigger'] = rand(0, time());
$config['pw_min_len'] = '16';

$config['redis'] = array(
    'host' => Manifest::get('REDIS_HOST', '127.0.0.1'),
    'password' => Manifest::get('REDIS_PASSWORD', ''),
    'port' => Manifest::get('REDIS_PORT', '6379'),
    'timeout' => Manifest::get('REDIS_TIMEOUT', 0),
);

$config['relaxed_track_views'] = 'y';
// $config['req_mbr_activation'] = 'email';
$config['require_cookie_consent'] = 'y';
$config['require_secure_passwords'] = 'y';
// $config['require_terms_of_service'] = 'y';
$config['reserved_category_word'] = $assign_to_config['global_vars']['config:reserved_category_word'] = 'categorias';
$config['share_analytics'] = 'n';
$config['show_ee_news'] = 'n';
$config['show_profiler'] = Manifest::get('DEBUG_PROFILER', 'n');
$config['sig_allow_img_hotlink'] = 'n';
$config['site_404'] = 'site/404';
$config['spellcheck_language_code'] = 'pt';
$config['strict_urls'] = $strict_urls;
$config['template_group'] = 'site';
$config['template'] = 'index';
$config['theme_folder_path'] = Manifest::get('THEME_FOLDER_PATH', '/var/www/html/themes/');
$config['theme_folder_url'] = Manifest::get('THEME_FOLDER_URL', '/themes/');
$config['time_format'] = '24';
$config['use_orig_name_as_fallback_title'] = 'y';
$config['updater_allow_advanced'] = 'y';
$config['use_category_name'] = 'y';
$config['word_separator'] = 'dash';
$config['xml_lang'] = 'pt';
// EOF
