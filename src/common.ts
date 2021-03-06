import _ from 'lodash';
import { Constants } from './constants';

export namespace Common {

    /** 
     * @description Executa o eval alterando as propriedades do source para seus determinados valores dentro do contexto.
     * @param source 
     * @param context 
     */
    export function evalInContext(source, context) {
        if (source) {
            source.split(' ').forEach(word => {
                let firstKey = (word.indexOf('.') != -1 ? word.substring(0, word.indexOf('.')) : word).replace(/ /g, '');
                if (firstKey && word && context && context.hasOwnProperty(firstKey)) {
                    let value = _.get(context, word.replace(/ /g, ''));
                    if (window['capivara'].isString(value)) {
                        source = source.replace(word, value != null ? "'" + value + "'" : null);
                    } else {
                        source = source.replace(word, value != null ? value : null);
                    }
                }
            });
        }
        return eval(source);
    }

    export function getAttributeCpShow(element) {
        return element.getAttribute(Constants.SHOW_ATRIBUTE_NAME);
    }

    export function getScope(element) {
        return element[Constants.SCOPE_ATTRIBUTE_NAME];
    }

    export function getScopeParent(element) {
        if (getScope(element)) {
            return getScope(element).scope;
        }
        if (element.parentNode) {
            return getScopeParent(element.parentNode);
        }
    }

}