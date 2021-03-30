#!"C:\xampp\perl\bin\perl.exe"

print "Content-type: text/html\n\n";

use DBI;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use JSON;
use XML::Simple;
use Data::Dumper;

my $host = "localhost";
my $database = "chessf";
my $table = "chessf1";
my $user = "root";
my $pw = "";
my $driver = "DBI:mysql:database=$database;host=$host";    
my $dbh = DBI->connect($driver, $user, $pw) || die $DBI::errstr;

#my @row = $dbh->selectrow_array("select * from $table where id1=(SELECT LAST_INSERT_ID());");
#my @level = $dbh->selectrow_array("SELECT FROM $table WHERE ID=(SELECT MAX(ID) FROM $table);");
#print "@level";


$dbh->do("DELETE FROM $table WHERE ID=(SELECT MAX(ID) FROM $table);");
my @row = $dbh->selectrow_array("SELECT id1,id2,id3,id4,id5,id6,id7,id8 FROM $table WHERE ID=(SELECT MAX(ID) FROM $table);");

#SELECT LAST_INSERT_ID();
#print "@row";

#foreach my $pizza in(@row){

#}
#print "@row[7]";
my @final;
foreach my $pizza (@row) {
  #print "$pizza\n";
  #print ",";
  push(@final,$pizza,",");
  #print "@final";
}
pop(@final);
$dbh->disconnect;
my $json = encode_json(@final);
print "@final";
