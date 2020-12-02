console.debug('Loading exploration');

function exploreCommand(input){
    const args = String(input).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    switch (cmd){
        case 'explore':

            break;
        default:
            termOutput('Unrecognized exploration command, try \'help\' if you\'re stuck.');
            break;
    }
}