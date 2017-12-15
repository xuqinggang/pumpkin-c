#!/bin/bash
project_path=$PWD

for module in fonts css js images vendor

do
cd $project_path/dist/
if [ ! -d "images" ]; then
    mkdir images
fi
if [ $module == "vendor" ]; then
    module=js/vendor
fi
cd $project_path/dist/$module
for entry in ./*
do
    filename=${entry##*/}
	if [ -f $filename ]; then
        path=$PWD/$filename
		remote_path=/pumpkin-c/$module/$filename
	    echo $remote_path
		curl -f -F file=@$path -F remote_path=$remote_path -F bucket_name=static -F disable_async=true "http://cos.kuaizhan.sohuno.com/api/v2/upload"
    fi
done
	
done
