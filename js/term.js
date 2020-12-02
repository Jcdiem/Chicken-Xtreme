console.debug('Terminal library loaded');

function termCommand(input){
    termOutput($('#term-input').text() + input);
    const args = String(input).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase();

    console.log('term switch running');
    switch(cmd){
        case 'help':
            termOutput('Available commands are \'cd\', \'clear\', and \'help\'')
            break;

        case 'cd':
            if(args[0] === '..'){
                changePath('desc')
            }
            else{
                changePath('asc', args[0])
            }
            break;

        case 'clear':
            $('#term-output').empty();
            //Resend last, so they know they just cleared
            termOutput($('#term-input').text() + input);
            break;

        default:
            termOutput('Unknown command \'' + cmd + '\', try \'help\'');
            break;
    }
}

function termOutput(txt){
    $('#term-output').append('<p class="termItem">' + txt + '</p>');
}

function changePath(type, text=''){
    const curPath = String($('#term-inputHeader').text());

    //Move to new folder
    if(type === 'asc'){
        //If statement to prevent prepending a '/' when the current dir is just '[/]$'
        if(curPath.charAt(2) === ']'){
            $('#term-inputHeader').text(curPath.substr(0,curPath.length-2) + text + ']$')
        }
        else{
            $('#term-inputHeader').text(curPath.substr(0,curPath.length-2) + '/' + text + ']$')
        }
    }
    //Go down a folder
    else if(type === 'desc'){
        let tmpPath = curPath.split('/');
        tmpPath[tmpPath.length - 1] = '';

        //Make the new path from the array of path parts
        let pathOut = '';
        //TODO: Find out why tmpPath has a leading ' ' that is counted
        for(let i = 0; i < tmpPath.length - 1; i++){
            //Add dest to path
            pathOut += tmpPath[i];

            //Add the root slash
            if(i === 0){
                pathOut = pathOut.substr(1);
                pathOut = '[/'+pathOut;
            }
            //Prevent adding a slash at the final folder
            else if(!( (i + 2) === tmpPath.length)){
                pathOut += '/';
            }
        }
        pathOut += ']$';

        $('#term-inputHeader').text(pathOut);
    }
}