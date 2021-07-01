<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// $protocol = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") ? "https://" : "http://";
// $port = $_SERVER["SERVER_PORT"];


/**
 * @see https://stackoverflow.com/a/42387790
 */
// if (isset($_SERVER['HTTP_CF_VISITOR'])) {
//   $cf_visitor = json_decode($_SERVER['HTTP_CF_VISITOR']);

//   if (isset($cf_visitor->scheme) && $cf_visitor->scheme == 'https') {
//     $protocol  = "https://";
//   }
// }

/**
 * @see https://ellislab.com/blog/entry/http-host-and-server-name-security-issues
 */
switch ($_SERVER['HTTP_HOST']) {
  case 'ma.gov.br':
  case 'ma.appcivico.com.br':
    $domain = $_SERVER['HTTP_HOST'];
    break;
  default:
    $domain = 'localhost';
    $port = '50025';
}

// $site_url = ($port !== '443' && $port !== '80') ? $protocol . $domain . ':' . $port : $protocol . $domain;

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
$config['allow_multi_logins'] = 'n';
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
$config['base_url'] = '';
// $config['cache_driver'] = 'redis';
$config['captcha_url'] = '/images/captchas';
// $config['censored_words'] = 'dagnabbit|consarnit|golly gee willikers';
$config['channel_form_overwrite'] = 'y';
$config['cookie_domain'] = $domain;
$config['cookie_prefix'] = 'ma_';
$config['cookie_samesite'] = 'Strict';
// $config['cookie_secure'] = 'y';
$config['cp_url'] = '/admin.php';

$config['css_js_settings'] = [
    'js' => '',
    'css' => '
        .dashboard::before {
            content: url("/assets/images/brand/gov__ma.svg");
            display: block;
            grid-column: 2/-2;
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
$config['enable_throttling'] = 'y';
$config['filename_increment'] = 'y';
$config['force_redirect'] = 'y';
$config['hidden_template_404'] = 'y';
$config['htaccess_path'] = '/var/www/html/.htaccess';
$config['ignore_entry_stats'] = 'n';
$config['index_page'] = '';
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
$config['reserved_category_word'] = 'secretarias';
$config['share_analytics'] = 'n';
$config['show_ee_news'] = 'n';
$config['show_profiler'] = 'n';
$config['sig_allow_img_hotlink'] = 'n';
$config['site_404'] = '-/404';
// $config['site_url'] = $site_url . '/';
$config['site_url'] = '/';
$config['spellcheck_language_code'] = 'pt';
$config['strict_urls'] = 'y';
$config['template_group'] = '-';
$config['template'] = 'index';
$config['theme_folder_path'] = '/var/www/html/themes/'; // docker volume path
$config['theme_folder_url'] = '/themes/';
$config['time_format'] = '24';
$config['updater_allow_advanced'] = 'y';
// $config['upload_blocked_file_names'] = array('logo.png');

$config['upload_preferences'] = array(
  5 => array(                                       // ID of upload destination
    'name'        => 'Documentos',                  // Display name in control panel
    'server_path' => '/var/www/html/uploads/docs/', // Server path to upload directory
    'url'         => '/uploads/docs/'               // URL of upload directory
  ),

  6 => array(                                       // ID of upload destination
    'name'        => 'Imagens',                     // Display name in control panel
    'server_path' => '/var/www/html/uploads/imgs/', // Server path to upload directory
    'url'         => '/uploads/imgs/'               // URL of upload directory
  ),

  7 => array(                                       // ID of upload destination
    'name'        => 'Anúncios',                    // Display name in control panel
    'server_path' => '/var/www/html/uploads/ads/',  // Server path to upload directory
    'url'         => '/uploads/ads/'                // URL of upload directory
  )
);

$config['use_category_name'] = 'y';
$config['word_separator'] = 'dash';
$config['xml_lang'] = 'pt';
// EOF
