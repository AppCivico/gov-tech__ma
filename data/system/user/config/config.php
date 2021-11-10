<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

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

$strict_urls = 'n';

/**
 * @see https://ellislab.com/blog/entry/http-host-and-server-name-security-issues
 */
$site_name = '';
$cp_url = '/admin.php';
$domain = $_SERVER['HTTP_HOST'];

switch ($_SERVER['HTTP_HOST']) {
    case 'aged.ma.gov.br':
    case 'aged.ma.gov.local':
    case 'aged-ma.appcivico.com.br':
        $site_name = 'aged';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'mob.ma.gov.br':
    case 'mob.ma.gov.local':
    case 'mob-ma.appcivico.com.br':
        $site_name = 'mob';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'agem.ma.gov.br':
    case 'agem.ma.gov.local':
    case 'agem-ma.appcivico.com.br':
        $site_name = 'agem';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'homol.agerp.ma.gov.br':
    case 'agerp.ma.gov.br':
    case 'agerp.ma.gov.local':
    case 'agerp-ma.appcivico.com.br':
        $site_name = 'agerp';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'agemsul.ma.gov.br':
    case 'agemsul.ma.gov.local':
    case 'agemsul-ma.appcivico.com.br':
        $site_name = 'agemsul';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'arsema.ma.gov.br':
    case 'arsema.ma.gov.local':
    case 'arsema-ma.appcivico.com.br':
        $site_name = 'arsema';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'bombeiros.ma.gov.br':
    case 'bombeiros.ma.gov.local':
    case 'bombeiros-ma.appcivico.com.br':
        $site_name = 'bombeiros';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'corona.ma.gov.br':
    case 'corona.ma.gov.local':
    case 'corona-ma.appcivico.com.br':
        $site_name = 'corona';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'casacivil.ma.gov.br':
    case 'casacivil.ma.gov.local':
    case 'casacivil-ma.appcivico.com.br':
        $site_name = 'casacivil';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'cintra.ma.gov.br':
    case 'cintra.ma.gov.local':
    case 'cintra-ma.appcivico.com.br':
        $site_name = 'cintra';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'ccl.ma.gov.br':
    case 'ccl.ma.gov.local':
    case 'ccl-ma.appcivico.com.br':
        $site_name = 'ccl';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'caema.ma.gov.br':
    case 'caema.ma.gov.local':
    case 'caema-ma.appcivico.com.br':
        $site_name = 'caema';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'consea.ma.gov.br':
    case 'consea.ma.gov.local':
    case 'consea-ma.appcivico.com.br':
        $site_name = 'consea';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'defesacivil.ma.gov.br':
    case 'defesacivil.ma.gov.local':
    case 'defesacivil-ma.appcivico.com.br':
        $site_name = 'defesacivil';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'detran.ma.gov.br':
    case 'transito.ma.gov.br':
    case 'detran.ma.gov.local':
    case 'transito.ma.gov.local':
    case 'detran-ma.appcivico.com.br':
    case 'transito-ma.appcivico.com.br':
        $site_name = 'detran';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'diariooficial.ma.gov.br':
    case 'diariooficial.ma.gov.local':
    case 'diariooficial-ma.appcivico.com.br':
        $site_name = 'diariooficial';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'homol.egma.ma.gov.br':
    case 'egma.ma.gov.br':
    case 'egma.ma.gov.local':
    case 'egma-ma.appcivico.com.br':
        $site_name = 'egma';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'portodoitaqui.ma.gov.br':
    case 'emap.ma.gov.br':
    case 'portodoitaqui.ma.gov.local':
    case 'emap.ma.gov.local':
    case 'portodoitaqui-ma.appcivico.com.br':
    case 'emap-ma.appcivico.com.br':
        $site_name = 'portodoitaqui';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'fmrb.ma.gov.br':
    case 'fmrb.ma.gov.local':
    case 'fmrb-ma.appcivico.com.br':
        $site_name = 'fmrb';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'fapema.br':
    case 'fapema.local':
    case 'appcivico.com.br':
        $site_name = 'fapema';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'gmg.ma.gov.br':
    case 'gmg.ma.gov.local':
    case 'gmg-ma.appcivico.com.br':
        $site_name = 'gmg';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'iterma.ma.gov.br':
    case 'iterma.ma.gov.local':
    case 'iterma-ma.appcivico.com.br':
        $site_name = 'iterma';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'inmeq.ma.gov.br':
    case 'inmeq.ma.gov.local':
    case 'inmeq-ma.appcivico.com.br':
        $site_name = 'inmeq';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'iprev.ma.gov.br':
    case 'iprev.ma.gov.local':
    case 'iprev-ma.appcivico.com.br':
        $site_name = 'iprev';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'procon.ma.gov.br':
    case 'procon.ma.gov.local':
    case 'procon-ma.appcivico.com.br':
        $site_name = 'procon';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'viva.ma.gov.br':
    case 'viva.ma.gov.local':
    case 'viva-ma.appcivico.com.br':
        $site_name = 'viva';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'imesc.ma.gov.br':
    case 'imesc.ma.gov.local':
    case 'imesc-ma.appcivico.com.br':
        $site_name = 'imesc';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'jucema.ma.gov.br':
    case 'jucema.ma.gov.local':
    case 'jucema-ma.appcivico.com.br':
        $site_name = 'jucema';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'lacen.ma.gov.br':
    case 'lacen.ma.gov.local':
    case 'lacen-ma.appcivico.com.br':
        $site_name = 'lacen';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'homol.mapa.ma.gov.br':
    case 'mapa.ma.gov.br':
    case 'mapa.ma.gov.local':
    case 'mapa-ma.appcivico.com.br':
        $site_name = 'mapa';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'policiacivil.ma.gov.br':
    case 'policiacivil.ma.gov.local':
    case 'policiacivil-ma.appcivico.com.br':
        $site_name = 'policiacivil';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'pm.ssp.ma.gov.br':
    case 'pm.ssp.ma.gov.local':
    case 'pm-ssp.ma.appcivico.com.br':
        $site_name = 'pm';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'transparencia.ma.gov.br':
    case 'transparencia.ma.gov.local':
    case 'transparencia-ma.appcivico.com.br':
        $site_name = 'transparencia';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'pge.ma.gov.br':
    case 'pge.ma.gov.local':
    case 'pge-ma.appcivico.com.br':
        $site_name = 'pge';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'trabalhojovem.ma.gov.br':
    case 'trabalhojovem.ma.gov.local':
    case 'trabalhojovem-ma.appcivico.com.br':
        $site_name = 'trabalhojovem';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'minhacasamelhor.ma.gov.br':
    case 'minhacasamelhor.ma.gov.local':
    case 'minhacasamelhor-ma.appcivico.com.br':
        $site_name = 'minhacasamelhor';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'radiotimbira.ma.gov.b':
    case 'radiotimbira.ma.gov.local':
    case 'radiotimbira-ma.appcivico.com.br':
        $site_name = 'radiotimbira';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'seati.ma.gov.br':
    case 'seati.ma.gov.local':
    case 'seati-ma.appcivico.com.br':
        $site_name = 'seati';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'secap.ma.gov.br':
    case 'secap.ma.gov.local':
    case 'secap-ma.appcivico.com.br':
        $site_name = 'secap';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'sagrima.ma.gov.br':
    case 'sagrima.ma.gov.local':
    case 'sagrima-ma.appcivico.com.br':
        $site_name = 'sagrima';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'secti.ma.gov.br':
    case 'secti.ma.gov.local':
    case 'secti-ma.appcivico.com.br':
        $site_name = 'secti';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'secom.ma.gov.br':
    case 'secom.ma.gov.local':
    case 'secom-ma.appcivico.com.br':
        $site_name = 'secom';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'sefaz.ma.gov.br':
    case 'sefaz.ma.gov.local':
    case 'sefaz-ma.appcivico.com.br':
        $site_name = 'sefaz';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'segep.ma.gov.br':
    case 'segep.ma.gov.local':
    case 'segep-ma.appcivico.com.br':
        $site_name = 'segep';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'mulher.ma.gov.br':
    case 'semu.ma.gov.br':
    case 'mulher.ma.gov.local':
    case 'semu.ma.gov.local':
    case 'mulher-ma.appcivico.com.br':
    case 'semu-ma.appcivico.com.br':
        $site_name = 'semu';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'saude.ma.gov.br':
    case 'saude.ma.gov.local':
    case 'saude-ma.appcivico.com.br':
        $site_name = 'saude';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'secid.ma.gov.br':
    case 'secid.ma.gov.local':
    case 'secid-ma.appcivico.com.br':
        $site_name = 'secid';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'seap.ma.gov.br':
    case 'seap.ma.gov.local':
    case 'seap-ma.appcivico.com.br':
        $site_name = 'seap';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'saf.ma.gov.br':
    case 'saf.ma.gov.local':
    case 'saf-ma.appcivico.com.br':
        $site_name = 'saf';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'cultura.ma.gov.br':
    case 'secma.ma.gov.br':
    case 'cultura.ma.gov.local':
    case 'secma.ma.gov.local':
    case 'cultura-ma.appcivico.com.br':
    case 'secma-ma.appcivico.com.br':
        $site_name = 'secma';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'sedes.ma.gov.br':
    case 'sedes.ma.gov.local':
    case 'sedes-ma.appcivico.com.br':
        $site_name = 'sedes';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'homol.sedihpop.ma.gov.br':
    case 'sedihpop.ma.gov.br':
    case 'direitos.ma.gov.local':
    case 'sedihpop.ma.gov.local':
    case 'direitos-ma.appcivico.com.br':
    case 'sedihpop-ma.appcivico.com.br':
        $site_name = 'sedihpop';
        $assign_to_config['global_vars']['global:editorial-group'] = '21';
        break;

    case 'educacao.ma.gov.br':
    case 'seduc.ma.gov.br':
    case 'educacao.ma.gov.local':
    case 'seduc.ma.gov.local':
    case 'educacao-ma.appcivico.com.br':
    case 'seduc-ma.appcivico.com.br':
        $site_name = 'seduc';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'sedel.ma.gov.br':
    case 'sedel.ma.gov.local':
    case 'sedel-ma.appcivico.com.br':
        $site_name = 'sedel';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'segov.ma.gov.br':
    case 'segov.ma.gov.local':
    case 'segov-ma.appcivico.com.br':
        $site_name = 'segov';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'seinc.ma.gov.br':
    case 'seinc.ma.gov.local':
    case 'seinc-ma.appcivico.com.br':
        $site_name = 'seinc';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'sinfra.ma.gov.br':
    case 'sinfra.ma.gov.local':
    case 'sinfra-ma.appcivico.com.br':
        $site_name = 'sinfra';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'sema.ma.gov.br':
    case 'sema.ma.gov.local':
    case 'sema-ma.appcivico.com.br':
        $site_name = 'sema';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'seme.ma.gov.br':
    case 'seme.ma.gov.local':
    case 'seme-ma.appcivico.com.br':
        $site_name = 'seme';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'sepe.ma.gov.br':
    case 'sepe.ma.gov.local':
    case 'sepe-ma.appcivico.com.br':
        $site_name = 'sepe';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'sri.ma.gov.br':
    case 'sri.ma.gov.local':
    case 'sri-ma.appcivico.com.br':
        $site_name = 'sri';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'rebras.ma.gov.br':
    case 'rebras.ma.gov.local':
    case 'rebras-ma.appcivico.com.br':
        $site_name = 'rebras';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'homol.turismo.ma.gov.br':
    case 'turismo.ma.gov.br':
    case 'setur.ma.gov.br':
    case 'turismo.ma.gov.local':
    case 'setur.ma.gov.local':
    case 'turismo-ma.appcivico.com.br':
    case 'setur-ma.appcivico.com.br':
        $site_name = 'setur';
        $assign_to_config['global_vars']['global:editorial-group'] = '9';
        break;

    case 'ssp.ma.gov.br':
    case 'ssp.ma.gov.local':
    case 'ssp-ma.appcivico.com.br':
        $site_name = 'ssp';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'stc.ma.gov.br':
    case 'stc.ma.gov.local':
    case 'stc-ma.appcivico.com.br':
        $site_name = 'stc';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'seplan.ma.gov.br':
    case 'seplan.ma.gov.local':
    case 'seplan-ma.appcivico.com.br':
        $site_name = 'seplan';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'trabalho.ma.gov.br':
    case 'setres.ma.gov.br':
    case 'trabalho.ma.gov.local':
    case 'setres.ma.gov.local':
    case 'trabalho-ma.appcivico.com.br':
    case 'setres-ma.appcivico.com.br':
        $site_name = 'setres';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'juventude.ma.gov.br':
    case 'seejuv.ma.gov.br':
    case 'juventude.ma.gov.local':
    case 'seejuv.ma.gov.local':
    case 'juventude-ma.appcivico.com.br':
    case 'seejuv-ma.appcivico.com.br':
        $site_name = 'seejuv';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'seepp.ma.gov.br':
    case 'seepp.ma.gov.local':
    case 'seepp-ma.appcivico.com.br':
        $site_name = 'seepp';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'igualdaderacial.ma.gov.br':
    case 'seir.ma.gov.br':
    case 'igualdaderacial.ma.gov.local':
    case 'seir.ma.gov.local':
    case 'igualdaderacial-ma.appcivico.com.br':
    case 'seir-ma.appcivico.com.br':
        $site_name = 'seir';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'seloquilombos.ma.gov.br':
    case 'seloquilombos.ma.gov.local':
    case 'seloquilombos-ma.appcivico.com.br':
        $site_name = 'seloquilombos';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'tce.ma.gov.br':
    case 'tce.ma.gov.local':
    case 'tce-ma.appcivico.com.br':
        $site_name = 'tce';
        $assign_to_config['global_vars']['global:editorial-group'] = '';
        break;

    case 'homol.ma.gov.br':
    case 'ma.gov.br':
    case 'ma.gov.local':
    case 'ma.appcivico.com.br':
    case 'localhost':
    default:
        $strict_urls = 'y';
        $site_name = 'default_site';
        $assign_to_config['global_vars']['global:editorial-group'] = '3';
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
    'hostname' => Manifest::get('DB_HOSTNAME', ''),
    'database' => Manifest::get('DB_DATABASE', ''),
    'username' => Manifest::get('DB_USERNAME', ''),
    'password' => Manifest::get('DB_PASSWORD', ''),
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
$config['base_path'] = Manifest::get('BASE_PATH', '/var/www/html/'); // docker volume path
$config['cache_driver'] = Manifest::get('CACHE_DRIVER', 'file');
$config['captcha_url'] = '/images/captchas';
$config['cookie_domain'] = $domain;
$config['cookie_prefix'] = 'ma_';
$config['cookie_samesite'] = 'Strict';
// $config['cookie_secure'] = 'y';

$config['css_js_settings'] = [
    'js' => '(function() {
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

    ',
    'enable' => true
];

$config['date_format'] = '%j/%n/%Y';
$config['debug'] = Manifest::get('DEBUG', '1');
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
$config['require_cookie_consent'] = 'n';
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
$config['updater_allow_advanced'] = 'y';
$config['use_category_name'] = 'y';
$config['word_separator'] = 'dash';
$config['xml_lang'] = 'pt';
// EOF
