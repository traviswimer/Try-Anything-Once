# function
add = (num1, num2) -> num1 + num2 -1

# array
myArray = [1,3,5,7]

truth = true

thing = "stuff" if truth

counter = 0

increase = (num) -> counter += num

increase num for num in myArray

console.log counter 



printAll = (myStrings...) -> console.log str for str in myStrings

printAll ["asdf", "fdsa", "stuff"]

