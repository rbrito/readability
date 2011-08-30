readStyle='style-newspaper';
readSize='size-large';
readMargin='margin-wide';

_readability_script=document.createElement('script');
_readability_script.type='text/javascript';
_readability_script.src='chrome://readability/content/scripts/readability.js';
document.getElementsByTagName('head')[0].appendChild(_readability_script);

_readability_css=document.createElement('link');
_readability_css.rel='stylesheet';
_readability_css.href='chrome://readability/content/style/readability.css';
_readability_css.type='text/css';
_readability_css.media='screen';
document.getElementsByTagName('head')[0].appendChild(_readability_css);

_readability_print_css=document.createElement('link');
_readability_print_css.rel='stylesheet';
_readability_print_css.href='chrome://readability/content/style/readability-print.css';
_readability_print_css.media='print';
_readability_print_css.type='text/css';
document.getElementsByTagName('head')[0].appendChild(_readability_print_css);