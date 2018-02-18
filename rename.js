document.getElementById('execute').addEventListener('click', function(){
    document.getElementById('result-status').innerHTML = null;
    var location  = document.getElementById('location').value;
    var rename    = document.getElementsByName('manage');
    for(i = 0; i < rename.length; i++)
    {
        if(rename[i].checked)
        {
            option = rename[i].value;
        }
    }
    var fs          = require('fs');
    location        = location.replace(/\\/g, "/");

    //insert forward slash to reduce user mistake in writting a slash
    loclength       = location.length;
    loclastindex    = location.substring(loclength-1, loclength);
    if(loclastindex != "/")
    {
        location += "/";
    }

    var fulldir     = location;

    fs.readdir(fulldir, function (error, files) {
        if (error)
        {
            document.getElementById("result-status").innerHTML =
            '<div class="card">' +
                '<div class="card-header bg-red static text-white">Error</div>' +
                '<div class="card-content">' +
                    '<div class="card-content-text" style="word-wrap:break-word;">' +
                        '<pre>' +
                            '<code style="overflow:auto">' +
                                error +
                            '</code>' +
                        '</pre>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="block" style="margin-bottom:2px"></div>' +
            document.getElementById("result-status").innerHTML;
        }
    
        document.getElementById('success-count').value = 0;

        newfile         = "";
        deletechar      = document.getElementsByName('delete-character')[0].value;
        replacefind     = document.getElementsByName('replace-find')[0].value;
        replacewith     = document.getElementsByName('replace-with')[0].value;
        insertbefore    = document.getElementsByName('insert-before')[0].value;
        insertafter     = document.getElementsByName('insert-after')[0].value;

        files.forEach(function (filename)
        {
            arrname       = filename.split(".");
            //assumtion file name including extension has written like as follow
            //loremipsum.pdf
            filenameonly  = arrname[0];
            fileextension = "." + arrname[arrname.length-1];

            if(option == 1)
            {
                newfile = filename.replace(deletechar, "");
            }
            if(option == 2)
            {
                newfile = filename.replace(changefind, changewith);
            }
            if(option == 3)
            {
                newfile = insertbefore + filenameonly + insertafter + fileextension;
            }
            fs.rename(fulldir + filename, fulldir + newfile, function (error)
            {
                if (error)
                {
                    document.getElementById("result-status").innerHTML =
                    '<div class="card">' +
                        '<div class="card-header bg-red static text-white">Error</div>' +
                        '<div class="card-content">' +
                            '<div class="card-content-text" style="word-wrap:break-word;">' +
                                'Filename : ' + filename + "<br/>" +
                                '<pre>' +
                                    '<code style="overflow:auto">' +
                                        error +
                                    '</code>' +
                                '</pre>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="block" style="margin-bottom:2px"></div>' +
                    document.getElementById("result-status").innerHTML;
                }
                else
                {
                    successcount = document.getElementById('success-count').value;
                    successcount = Number(successcount);
                    successcount++;
                    document.getElementById('success-count').value = successcount;
                }
            });
        });
    });
    setTimeout(function(){
        successcount = Number(document.getElementById('success-count').value);
        if(successcount > 0)
        {
            var alertsuccess = 
            '<div class="alert block alert-sm bg-blue static text-white">' +
                'Success ['+ successcount + ']' +
            '</div>' +
            '<div class="block" style="margin-bottom:2px"></div>';
            document.getElementById("result-status").innerHTML = alertsuccess + document.getElementById("result-status").innerHTML;
        }
    },500);
});
window.onerror = function(error, url, line) {
    var alerterror = 
        '<div class="card">' +
            '<div class="card-header bg-red static text-white">Error</div>' +
            '<div class="card-content">' +
                '<div class="card-content-text" style="word-wrap:break-word;">' +
                    '<pre>' +
                        '<code style="overflow:auto">' +
                            error +
                        '</code>' +
                    '</pre>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="block" style="margin-bottom:2px"></div>';
        document.getElementById("result-status").innerHTML = alerterror + document.getElementById("result-status").innerHTML;
};