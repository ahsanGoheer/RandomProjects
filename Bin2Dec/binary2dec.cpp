#include <iostream>
#include <string>
#include <math.h>
int bin_2_dec(int[],int);
bool isValid(std::string);
void convertToArray(std::string,int []);

int main()
{
    std::string binNumber;
    std::cout << "Enter the binary number : ";
    std::getline(std::cin, binNumber);
    int *outArray=nullptr;
    if (isValid(binNumber))
    {
        outArray = new int[binNumber.length()];
        convertToArray(binNumber, outArray);
        std::cout << "The Decimal Number is : " << bin_2_dec(outArray,binNumber.length()) <<std::endl;
    }
    system("pause");
    return 0;
}

bool isValid(std::string binaryNumber)
{
    bool isValid = true;
    for (size_t i = 0; i < binaryNumber.length(); i++)
    {
        if (binaryNumber[i] != '0' && binaryNumber[i] != '1')
        {
            std::cout << "Invalid Input!" << std::endl;
            isValid = false;
            break;
        }
    }
    return isValid;
}

void convertToArray(std::string binNumber, int outputArray[])
{
    for (size_t i = 0; i < binNumber.length(); i++)
    {
        outputArray[i] = (int)(binNumber[i] - 48);
    }
    
}

int bin_2_dec(int outputArray[],int size)
{
    int arraySize = size;
    int output = 0;
    for (size_t i = 0; i < arraySize; i++)
    {
        if (outputArray[i] == 1)
        {
            output += pow(2, i);
        }
        
    }
    return output;
}
