console.debug('Loading exploration');

function exploreCommand(cmd, args){
    switch (cmd){
        case 'explore':
            termOutput('Currently not implemented.')
            break;
        default:
            termOutput('Unrecognized exploration command, try \'help\' if you\'re stuck.');
            break;
    }
}