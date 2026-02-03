using Microsoft.Data.SqlClient;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace MyPurchasedBook.Class
{
    public class DbHelper
    {
        public DbHelper() {
            Utils utils =  new Utils();
            Task.Run(async () => await utils.ReadFile());
        }

        /*
         
         void Insert_Click(string name,string address)
    {
        string connstring=System.Configuration.ConfigurationManager.
ConnectionStrings["ConnStringName"].ConnectionString;

        SqlConnection con = new SqlConnection(connstring);

        string query = "Insert into DemoInUpDelete (Name, Address) values (@Name,@Address)";           
        SqlCommand cmd = new SqlCommand(query, con);
        cmd.CommandType=CommandType.Text;            
        //Pass values to Parameters
        cmd.Parameters.AddWithValue("@Name", name);
        cmd.Parameters.AddWithValue("@Price", address);         
        try
        {
            con.Open();
            int validateOperation=cmd.ExecuteNonQuery();
    if(validateOperation>0)
    {
        //Message insert succesfully
            }
            else
            {
             //Error
             }               
        }
        catch (SqlException e)
        {
           //Exception
        }
        finally
        {
            con.Close();               
        }
}
         
         */












    }
}


