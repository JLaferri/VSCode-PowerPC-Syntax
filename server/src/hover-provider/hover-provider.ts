import {Hover, Position} from 'vscode-languageserver'
import {TextDocument} from 'vscode-languageserver-textdocument'
import * as data from "../data";
import { getLineRange } from '../template-utils';


export class HoverProvider {

    constructor () {
    }

    public provideHover (document: TextDocument, position: Position): Hover {
        console.log("Hover Start")
        // console.log(document.getText(getLineRange(position)).match(/[\w\d.]+/))
        console.log("Hover Start")
        const hoveredWord = document.getText(getLineRange(position)).match(/[\w\d.]+/)[0];
        console.log('HOVER: ' + hoveredWord )
        if (/^0x[0-9a-fA-F]+$/g.test(hoveredWord)) {
            console.log(hoveredWord)
            let numericValue = parseInt(hoveredWord, 16);
            // let formattedText = new MarkdownString(`**ID:** ${hoveredWord} = ${numericValue}  \n`);
            let formattedText: string = `**ID:** ${hoveredWord} = ${numericValue}  \n`
            //TODO: Fix these to be more like getCOmmand
            data.getDataOffset(hoveredWord, formattedText);
            data.getGlobalAddresses(hoveredWord, formattedText);
            return {
                contents: formattedText
            }
        }else if(data.getCommand(hoveredWord) !== data.UnknownCommand){
            let formattedText = `${hoveredWord}  \n`;
            data.setHover(hoveredWord, formattedText);
            return { contents: formattedText };
        }
        // const definitionHoverItem: string = this.createSentence(definitions && definitions.length, 'definition');
        // const referenceHoverItem: string = this.createSentence(references && references.length, 'reference');
        //  new vscode.Hover([definitionHoverItem, referenceHoverItem]);
        console.log("Hover Null")
        return null
    }

}