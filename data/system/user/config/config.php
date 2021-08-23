<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * @see  https://gist.github.com/464756
 */
global $assign_to_config; // Make this global so we can add some of the config variables here

// make sure our global vars config exists
if (!isset($assign_to_config['global_vars']))
  $assign_to_config['global_vars'] = array(); // This array must be associative

$protocol = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") ? "https://" : "http://";
$port = isset($_SERVER["SERVER_PORT"]) ? $_SERVER["SERVER_PORT"] : 80;

/**
 * @see https://stackoverflow.com/a/42387790
 */
if (isset($_SERVER['HTTP_CF_VISITOR'])) {
  $cf_visitor = json_decode($_SERVER['HTTP_CF_VISITOR']);

  if (isset($cf_visitor->scheme) && $cf_visitor->scheme == 'https') {
    $protocol = "https://";
  }
}

/**
 * @see https://ellislab.com/blog/entry/http-host-and-server-name-security-issues
 */
$site_name = '';
$cp_url = '/admin.php';
$domain = $_SERVER['HTTP_HOST'];

switch ($_SERVER['HTTP_HOST']) {
    case 'detran.ma.gov.br':
    case 'transito.ma.gov.br':
    case 'detran.ma.gov.local':
    case 'transito.ma.gov.local':
    case 'detran-ma.appcivico.com.br':
    case 'transito-ma.appcivico.com.br':
        $site_name = 'detran';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'sedihpop.ma.gov.br':
    case 'direitos.ma.gov.local':
    case 'sedihpop.ma.gov.local':
    case 'direitos-ma.appcivico.com.br':
    case 'sedihpop-ma.appcivico.com.br':
        $site_name = 'sedihpop';
        $assign_to_config['global_vars']['global:editorial-group'] = '21';
        break;

    case 'setur.ma.gov.br':
    case 'turismo.ma.gov.br':
    case 'setur.ma.gov.local':
    case 'turismo.ma.gov.local':
    case 'setur-ma.appcivico.com.br':
    case 'turismo-ma.appcivico.com.br':
        $site_name = 'setur';
        $assign_to_config['global_vars']['global:editorial-group'] = '9';
        break;

    case 'ma.gov.br':
    case 'ma.gov.local':
    case 'ma.appcivico.com.br':
    case 'localhost':
    default:
        $site_name = 'default_site';
        $assign_to_config['global_vars']['global:editorial-group'] = '3';
        break;
}

$site_url = ($port !== '443' && $port !== '80') ? $protocol . $domain . ':' . $port : $protocol . $domain;

$assign_to_config['site_name'] = $site_name;
$assign_to_config['cp_url']    = $site_url . $cp_url;
$assign_to_config['site_url']  = $site_url;
$config['index_page'] = '';
$config['site_index'] = '';

// ExpressionEngine Config Items
// Find more configs and overrides at
// https://docs.expressionengine.com/latest/general/system-configuration-overrides.html

$config['app_version'] = '6.0.6';
$config['encryption_key'] = '90c1e6d60d21c0691882686407a4641f6cd6c4bf';
$config['session_crypt_key'] = '691b97ef2c0cbe431e448db295323337847f0330';
$config['database'] = array(
  'expressionengine' => array(
    'hostname' => 'db',
    'database' => 'eetest',
    'username' => 'eeuser',
    'password' => 'eepassword',
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
$config['auto_assign_cat_parents'] = 'y';
$config['avatar_max_height'] = '512';
$config['avatar_max_kb'] = '200';
$config['avatar_max_width'] = '512';
$config['avatar_path'] = '/var/www/html/images/avatars/'; // docker volume path
$config['avatar_url'] = '/images/avatars';
$config['base_path'] = '/var/www/html/'; // docker volume path
// $config['cache_driver'] = 'redis';
$config['base_url'] = '/';
$config['captcha_url'] = '/images/captchas';
// $config['censored_words'] = 'dagnabbit|consarnit|golly gee willikers';
$config['channel_form_overwrite'] = 'y';
$config['cookie_domain'] = $domain;
$config['cookie_prefix'] = 'ma_';
$config['cookie_samesite'] = 'Strict';
// $config['cookie_secure'] = 'y';

$config['css_js_settings'] = [
    'js' => '',
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
    ',
    // 'css_file' => 'custom_prod.css',
    // 'js_file' => 'custom_prod.js',
    'enable' => true
];

$config['date_format'] = '%j/%n/%Y';
$config['debug'] = $_SERVER['HTTP_HOST'] === 'localhost' ? '2' : '1';
$config['default_member_group'] = '4';
$config['default_site_timezone'] = 'America/Sao_Paulo';
$config['deft_lang'] = 'portuguese';
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
$config['profile_trigger'] = rand(0, time());
$config['pw_min_len'] = '16';
// $config['redis'] = array(
//   // 'host' => '127.0.0.1',
//   'host' => 'redis',
//   'password' => 'dU*TVk3yj3!n3pyRN&GAdG7+^K?_-CT6',
//   'port' => 6379,
//   'timeout' => 0
// );
$config['relaxed_track_views'] = 'y';
// $config['req_mbr_activation'] = 'email';
$config['require_cookie_consent'] = 'n';
$config['require_secure_passwords'] = 'y';
// $config['require_terms_of_service'] = 'y';
$config['reserved_category_word'] = $assign_to_config['global_vars']['config:reserved_category_word'] = 'categorias';
$config['share_analytics'] = 'n';
$config['show_ee_news'] = 'n';
$config['show_profiler'] = 'n';
$config['sig_allow_img_hotlink'] = 'n';
$config['site_404'] = 'site/404';
$config['spellcheck_language_code'] = 'pt';
$config['strict_urls'] = 'y';
$config['template_group'] = 'site';
$config['template'] = 'index';
$config['theme_folder_path'] = '/var/www/html/themes/'; // docker volume path
$config['theme_folder_url'] = '/themes/';
$config['time_format'] = '24';
$config['updater_allow_advanced'] = 'y';
// $config['upload_blocked_file_names'] = array('logo.png');
$config['upload_preferences'] = array(
    5 => array(                                               // ID of upload destination
        'name'        => 'Documentos',                          // Display name in control panel
        'server_path' => '/var/www/html/uploads/docs/',         // Server path to upload directory
        'url'         => '/uploads/docs/'                       // URL of upload directory
    ),
    6 => array(                                               // ID of upload destination
        'name'        => 'Imagens',                             // Display name in control panel
        'server_path' => '/var/www/html/uploads/imgs/',         // Server path to upload directory
        'url'         => '/uploads/imgs/'                       // URL of upload directory
    ),
    7 => array(                                               // ID of upload destination
        'name'        => 'Anúncios',                            // Display name in control panel
        'server_path' => '/var/www/html/uploads/ads/',          // Server path to upload directory
        'url'         => '/uploads/ads/'                        // URL of upload directory
    ),
    8 => array(                                               // ID of upload destination
        'name'        => 'Secretarias',                         // Display name in control panel
        'server_path' => '/var/www/html/uploads/secretarias/',  // Server path to upload directory
        'url'         => '/uploads/secretarias/'                // URL of upload directory
    ),
    9 => array(                                               // ID of upload destination
        'name'        => 'Ícones',                              // Display name in control panel
        'server_path' => '/var/www/html/uploads/icons/',        // Server path to upload directory
        'url'         => '/uploads/icons/'                      // URL of upload directory
    ),

// setur
    11 => array(                                              // ID of upload destination
        'name'        => 'Documentos',                          // Display name in control panel
        'server_path' => '/var/www/html/setur/uploads/docs/',   // Server path to upload directory
        'url'         => '/setur/uploads/docs/'                 // URL of upload directory
    ),
    13 => array(                                              // ID of upload destination
        'name'        => 'Imagens',                             // Display name in control panel
        'server_path' => '/var/www/html/setur/uploads/imgs/',   // Server path to upload directory
        'url'         => '/setur/uploads/imgs/'                 // URL of upload directory
    ),
    10 => array(                                              // ID of upload destination
        'name'        => 'Anúncios',                            // Display name in control panel
        'server_path' => '/var/www/html/setur/uploads/ads/',    // Server path to upload directory
        'url'         => '/setur/uploads/ads/'                  // URL of upload directory
    ),
    14 => array(                                              // ID of upload destination
        'name'        => 'Secretarias',                         // Display name in control panel
        'server_path' => '/var/www/html/setur/uploads/secretarias/',  // Server path to upload directory
        'url'         => '/setur/uploads/secretarias/'          // URL of upload directory
    ),
    12 => array(                                              // ID of upload destination
        'name'        => 'Ícones',                              // Display name in control panel
        'server_path' => '/var/www/html/setur/uploads/icons/',  // Server path to upload directory
        'url'         => '/setur/uploads/icons/'                // URL of upload directory
    ),
);
$config['use_category_name'] = 'y';
$config['word_separator'] = 'dash';
$config['xml_lang'] = 'pt';
// EOF
