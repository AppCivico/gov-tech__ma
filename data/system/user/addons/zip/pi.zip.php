<?php

/**
 *  MX ZIP for ExpressionEngine3.
 *
 * @category Plugins
 *
 * @author    Max Lazar <max@eec.ms>
 * @purpose MX Zip adds you capability to add files/folders into zipping archive directly from ExpressionEngine
 * @Commercial - please see LICENSE file included with this distribution
 */
require_once PATH_THIRD.'zip/config.php';

$plugin_info = array(
    'pi_name' => MX_ZIP_NAME,
    'pi_version' => MX_ZIP_VER,
    'pi_author' => MX_ZIP_AUTHOR,
    'pi_author_url' => MX_ZIP_DOCS,
    'pi_description' => MX_ZIP_DESC,
    'pi_usage' => zip::usage(),
);

class Zip
{
    public $return_data = '';
    public $remove_path = '';
    public $add_path = '';
    public $large_files = '';
    public $archive_folder = '';
    public $archive_name = '';
    public $archive_fname = '';
    public $comment = null;
    public $no_compression = false;
    public $remove_all_path = false;
    public $cache_path = false;
    public $speed = 500;

    public function __construct()
    {
        $LD = '\{';
        $RD = '\}';
        $SLASH = '\/';
        $tagdata = ee()->TMPL->tagdata;
        $variable = 'zip:files';
        $file_status = true;

        $this->cache_path = (!$this->cache_path) ? APPPATH.'cache/'.MX_ZIP_KEY : false;

        if (preg_match('/'.LD.$variable.'.*?'.RD.'(.*?)'.LD.'\/'.$variable.RD.'/s', $tagdata, $file_list)) {
            $max_size = (!ee()->TMPL->fetch_param('max_size')) ? (50 * 1024 * 1024) : (ee()->TMPL->fetch_param('max_size') * 1024 * 1024);
            $method = ee()->TMPL->fetch_param('method', 'php');
            $direct_output = ('yes' == ee()->TMPL->fetch_param('direct_output')) ? 'yes' : 'no';
            $overwrite = (ee()->TMPL->fetch_param('overwrite', false)) ? ee()->TMPL->fetch_param('overwrite') : 'no';

            $this->archive_name = $this->archive_fname = ee()->TMPL->fetch_param('filename', time().'.zip');
            $this->archive_folder = ee()->TMPL->fetch_param('folder', $this->cache_path);
            $this->large_files = ee()->TMPL->fetch_param('large_files', 'yes');
            $this->remove_path = ee()->TMPL->fetch_param('remove_path', null);
            $this->add_path = ee()->TMPL->fetch_param('add_path', null);
            $this->comment = ee()->TMPL->fetch_param('comment', '');
            $this->no_compression = ee()->TMPL->fetch_param('no_compression', false);
            $this->remove_all_path = ee()->TMPL->fetch_param('remove_all_path', false);
            $this->speed = ee()->TMPL->fetch_param('speed', $this->speed);

            // $overwrite  yes / no / keep_both
            $pack_size = 0;

            $this->archive_name = reduce_double_slashes($this->archive_folder.'/'.$this->archive_name);

            $filenames = explode(']', str_replace(array('&#47;', '[', "\n"), array('/', '', ''), $file_list[1]));

            $file_status = (file_exists($this->archive_name)) ? true : false;

            foreach ($filenames as $key => $value) {
                $filenames[$key] = trim($value);
            }

            if ('yes' == $overwrite && $file_status) {
                unlink($this->archive_name);
                $file_status = false;
            }

            if ('keep_both' == $overwrite && $file_status) {
                $file_info = pathinfo($this->archive_name);
                $file_name = basename($this->archive_name, '.'.$file_info['extension']);

                for ($i = 0; $i < 99999; ++$i) {
                    $this->archive_fname = $file_name.$i.'.zip';
                    $this->archive_name = reduce_double_slashes($this->archive_folder.'/'.$this->archive_fname);

                    $file_status = (file_exists($this->archive_name)) ? true : false;
                    if (!$file_status) {
                        break;
                    }
                }
            }

            if (!$file_status) {
                $this->_backup_pkzip($filenames);
            }
            if ('yes' == $direct_output) {
                $this->_download();
                unlink($this->archive_name);
            } else {
                return $this->return_data = $this->archive_name;
            }
        }
    }

    public function _download()
    {
        $speed = round($this->speed * 1024);

        $type = 'application/zip';

        // Fix IE bug [0]
        $header_file = (strstr($_SERVER['HTTP_USER_AGENT'], 'MSIE')) ? preg_replace('/\./', '%2e', $this->archive_fname, substr_count($this->archive_fname, '.') - 1) : $this->archive_fname;

        // Made headers
        header('Pragma: public');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Cache-Control: public', false);
        header('Content-Description: File Transfer');
        header('Content-Type: '.$type);
        header('Accept-Ranges: bytes');
        header('Content-Disposition: attachment; filename="'.$this->archive_fname.'";');
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: '.filesize($this->archive_name));

        if ($stream = fopen($this->archive_name, 'rb')) {
            while (!feof($stream) && 0 == connection_status()) {
                echo  fread($stream, $speed);
                flush();
                sleep(1);
            }

            fclose($stream);
        }
    }

    public function _backup_pkzip($files_to_add)
    {
        if (!defined('PCLZIP_TEMPORARY_DIR')) {
            define('PCLZIP_TEMPORARY_DIR', $this->cache_path);
            if (!is_dir($this->cache_path)) {
                mkdir($this->cache_path.'', 0777, true);
            }
            if (!is_really_writable($this->cache_path)) {
            }
        }

        $archive = new PclZip($this->archive_name);

        if (0 != count($files_to_add)) {
            $v_list = $archive->create(
                $files_to_add,
                PCLZIP_OPT_REMOVE_PATH,
                $this->remove_path,
                PCLZIP_OPT_ADD_PATH,
                $this->add_path,
                (($this->no_compression) ? PCLZIP_OPT_NO_COMPRESSION : PCLZIP_OPT_TEMP_FILE_ON),
                (($this->remove_all_path) ? PCLZIP_OPT_REMOVE_ALL_PATH : PCLZIP_OPT_TEMP_FILE_ON),
                PCLZIP_OPT_COMMENT,
                $this->comment,
                PCLZIP_OPT_TEMP_FILE_ON
            );

            if (0 == $v_list) {
                die('Error : '.$archive->errorInfo(true));
            }
        }

        $return = true;
    }

    /*
    function _backup_system( $path, $file_list, $filename ) {

        if ( $file_list ) {
            foreach ( $file_list as $val ) {
                $archive_list = $archive_list . ' ' . $val;
            }
            $return = true;
        }

        if ( $dir_list ) {
            foreach ( $dir_list as $val ) {
                $archive_list = $archive_list . ' ' . $val;
            }
            $return = true;
        }


        if ( $return ) {
            $bk_filename = $filename . '.tgz';

            $command = "tar -cpzf $path$filename $archive_list $exclude";

            // $out = shell_exec($command);

            if ( file_exists( $path . $filename ) ) {
                $return = true;
            } else {
                $this->errors['message_failure'][] = ee()->lang->line( 'system_method_error' );
            }
        }
    }

     */

    // ----------------------------------------
    //  Plugin Usage
    // ----------------------------------------

    // This function describes how the plugin is used.
    //  Make sure and use output buffering

    public static function usage()
    {
        // for performance only load README if inside control panel
        return REQ === 'CP' ? file_get_contents(dirname(__FILE__).'/README.md') : null;
    }

    /* END */
}

require_once PATH_THIRD.'zip/pclzip.lib.php';
