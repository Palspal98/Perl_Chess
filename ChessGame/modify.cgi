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
my @spl = split(',', $local); 
#print "$local";

my $host = "localhost";
my $database = "chessf";
my $table = "chessf1";
my $user = "root";
my $pw = "";
my $driver = "DBI:mysql:database=$database;host=$host";    
my $dbh = DBI->connect($driver, $user, $pw) || die $DBI::errstr;

$dbh->do("TRUNCATE TABLE $table;");
my $id=0;
#print "@spl[0]";
$dbh->do("INSERT INTO $table VALUES($id,'@spl[0]','@spl[1]', '@spl[2]', '@spl[3]','@spl[4]', '@spl[5]', '@spl[6]','@spl[7]');");
$dbh->disconnect();