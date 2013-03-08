s3cmd put --acl-public --guess-mime-type index.html s3://smashandgrab/Frank/index.html
s3cmd put -r -m application/javascript --acl-public js/ s3://smashandgrab/Frank/js/
