using System.Formats.Tar;
using System.IO;

namespace MyPurchasedBook.Class
{
    public class Utils
    {
        public async Task<string> ReadFile()
        {
            try
            {
                // Open the text file using a stream reader.
                using StreamReader reader = new("TestFile.txt");

                // Read the stream as a string.
                string text = await reader.ReadToEndAsync();
                return text;
            }
            catch (Exception ex)
            {
                WriteLogs($"Utils.ReadFile (Err) : {ex.Message}");
                return "";
            }
        }


        public static void WriteLogs(string sentence) {
            // Create a string with a line of text.
            string text = sentence + Environment.NewLine;

            // Specify the directory
            string path = Environment.CurrentDirectory + "/Logs";

            CheckCreateFolder(path);
            CheckExistFile(path, text);
        }

        public static void CheckCreateFolder(string path)
        {
            // Determine whether the directory exists.
            if (Directory.Exists(path))
            {
                return;
            }
            else
            {
                DirectoryInfo di;
                try
                {
                    // Try to create the directory.
                    di = Directory.CreateDirectory(path);
                }
                catch (Exception ex)
                {
                    WriteLogs($"Utils.ReadFile (Err) : {ex.Message}");
                    return;
                }
            }
        }

        public static void CheckExistFile(string path, string sentence)
        {
            var fileName = $"{DateTime.Now.ToString("yyyyMMdd")}.txt";
            var time = $"{DateTime.Now.ToString("HH:mm:ss")}";
            if (File.Exists(Path.Combine(path, fileName)))
            {
                // Append new lines of text to the file
                File.AppendAllText(Path.Combine(path, fileName), $"{time} : {sentence}");
            }
            else {
                // Write the text to a new file named "WriteFile.txt".
                File.WriteAllText(Path.Combine(path, fileName), $"{time} : {sentence}");
            }
        }
    }
}
