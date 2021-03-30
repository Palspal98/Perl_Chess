#!"C:\xampp\perl\bin\perl.exe"

print "Content-type: text/html\n\n";

use DBI;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use JSON;
use XML::Simple;
use Data::Dumper;

my $cgi = CGI->new;                  
my $local = $cgi->param("r");  
#print "$local";       
my @spl = split(',', $local); 
#print "@spl[6]";


#print "***************************\n";


#print $cgi->header(-type => "application/json", -charset => "utf-8");
#print "$local was received\n"; 
my $host = "localhost";
my $database = "chessf";
my $table = "chessf1";
my $user = "root";
my $pw = "";
my $driver = "DBI:mysql:database=$database;host=$host";    
my $dbh = DBI->connect($driver, $user, $pw) || die $DBI::errstr;  

#my $store_id;
#foreach my $pizza (@spl) {
 # print "$pizza\n";
  #print "2";
  #$store_id[i]=$pizza;
  #}
#print "@spl[1]";
my $id=0;

$dbh->do("INSERT INTO $table VALUES($id,'@spl[0]','@spl[1]', '@spl[2]', '@spl[3]','@spl[4]', '@spl[5]', '@spl[6]','@spl[7]');");

$dbh->disconnect;


