package main

import (
	"errors"
	"fmt"
	"regexp"
)

type PersonInfo struct {
	Name     string
	Age      int
	Email    string
	Phone    string
	IsActive bool
}

// regexp 中Compile 可以处理error  MustCompile 如果正则语法错误，会直接 panic

// IsValidEmail 验证邮箱格式
func IsValidEmail(email string) bool {
	r := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)

	return r.MatchString(email)
}

func IsValidPhone(phone string) bool {
	r := regexp.MustCompile(`^1[3-9]\d{9}$`)
	return r.MatchString(phone)
}
func IsValidAge(age int) bool {
	return age >= 0 && age <= 120
}

// 创建用户信息
func (personInfo *PersonInfo) displayPersonInfo() {
	fmt.Println("====用户信息====")
	fmt.Println("姓名：", personInfo.Name)
	fmt.Println("年龄：", personInfo.Age)
	fmt.Println("邮箱：", personInfo.Email)
	fmt.Println("手机：", personInfo.Phone)
	fmt.Println("状态：", personInfo.IsActive)
}

// 修改年龄
func (personInfo *PersonInfo) updateAge(age int) error {
	if !IsValidAge(age) {
		return errors.New("invalid age")
	}
	personInfo.Age = age
	return nil
}

func createPersonInfo(name string, age int, email string, phone string, isActive bool) (*PersonInfo, error) {

	if !IsValidEmail(email) {
		return nil, errors.New("invalid email")
	}
	if !IsValidPhone(phone) {
		return nil, errors.New("invalid phone")
	}
	if !IsValidAge(age) {
		return nil, errors.New("invalid age")
	}
	return &PersonInfo{
		Name:     name,
		Age:      age,
		Email:    email,
		Phone:    phone,
		IsActive: isActive,
	}, nil

}

func main() {

	personInfo, err := createPersonInfo("张三", 18, "xiaokeai18@163.com", "18331037117", true)
	if err != nil {
		fmt.Println(err)
		return
	}
	personInfo.displayPersonInfo()
	err = personInfo.updateAge(19)
	if err != nil {
		fmt.Println(err)
		return
	}
	personInfo.displayPersonInfo()

}
