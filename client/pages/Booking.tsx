import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  Coffee,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";

const Booking: React.FC = () => {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    area: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit booking
      console.log("Booking submitted:", formData);
      setCurrentStep(4); // Success step
    }
  };

  const areas = [
    {
      id: "indoor",
      name: { vi: "Trong nhà", en: "Indoor" },
      description: {
        vi: "Không gian ấm cúng với điều hòa",
        en: "Cozy space with air conditioning",
      },
    },
    {
      id: "outdoor",
      name: { vi: "Ngoài trời", en: "Outdoor" },
      description: {
        vi: "Thoáng mát, gần gũi thiên nhiên",
        en: "Fresh air, close to nature",
      },
    },
    {
      id: "sofa",
      name: { vi: "Khu Sofa", en: "Sofa Area" },
      description: {
        vi: "Ghế sofa êm ái, thích hợp nhóm nhỏ",
        en: "Comfortable sofas, perfect for small groups",
      },
    },
  ];

  const timeSlots = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  const steps = [
    {
      number: 1,
      title: { vi: "Thông tin cá nhân", en: "Personal Information" },
    },
    { number: 2, title: { vi: "Chọn thời gian", en: "Select Time" } },
    { number: 3, title: { vi: "Chi tiết đặt bàn", en: "Booking Details" } },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-coffee-900 to-coffee-800 text-cream-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Coffee className="w-16 h-16 mx-auto mb-6 text-cream-200" />
            <h1 className="text-5xl lg:text-6xl font-bold font-serif mb-6">
              {t("booking.title")}
            </h1>
            <p className="text-xl lg:text-2xl text-cream-200 max-w-3xl mx-auto">
              {language === "vi"
                ? "Đặt bàn trước để có trải nghiệm tốt nhất tại Sống KOFFI"
                : "Reserve a table for the best experience at Song KOFFI"}
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentStep < 4 && (
            <>
              {/* Progress Steps */}
              <div className="mb-12">
                <div className="flex items-center justify-center space-x-8">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                            currentStep >= step.number
                              ? "bg-coffee-900 text-cream-100"
                              : "bg-coffee-200 text-coffee-600"
                          }`}
                        >
                          {currentStep > step.number ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            step.number
                          )}
                        </div>
                        <span className="text-sm text-coffee-600 mt-2 text-center">
                          {step.title[language]}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-16 h-0.5 bg-coffee-200 mx-4"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Form Steps */}
          <Card className="border-coffee-200">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-coffee-900 text-center">
                {currentStep === 1 &&
                  (language === "vi"
                    ? "Thông Tin Của Bạn"
                    : "Your Information")}
                {currentStep === 2 &&
                  (language === "vi" ? "Chọn Thời Gian" : "Select Time")}
                {currentStep === 3 &&
                  (language === "vi" ? "Chi Tiết Đặt Bàn" : "Booking Details")}
                {currentStep === 4 &&
                  (language === "vi"
                    ? "Đặt Bàn Thành Công!"
                    : "Booking Successful!")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-coffee-900 mb-2">
                          {t("booking.form.name")} *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="border-coffee-300 focus:border-coffee-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-coffee-900 mb-2">
                          {t("booking.form.phone")} *
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="border-coffee-300 focus:border-coffee-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-coffee-900 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-coffee-300 focus:border-coffee-500"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Date and Time */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-coffee-900 mb-2">
                          {t("booking.form.date")} *
                        </label>
                        <Input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="border-coffee-300 focus:border-coffee-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-coffee-900 mb-2">
                          {t("booking.form.time")} *
                        </label>
                        <Select
                          value={formData.time}
                          onValueChange={(value) =>
                            handleSelectChange("time", value)
                          }
                        >
                          <SelectTrigger className="border-coffee-300 focus:border-coffee-500">
                            <SelectValue
                              placeholder={
                                language === "vi" ? "Chọn giờ" : "Select time"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-coffee-900 mb-2">
                        {t("booking.form.guests")} *
                      </label>
                      <Select
                        value={formData.guests}
                        onValueChange={(value) =>
                          handleSelectChange("guests", value)
                        }
                      >
                        <SelectTrigger className="border-coffee-300 focus:border-coffee-500">
                          <SelectValue
                            placeholder={
                              language === "vi"
                                ? "Số lượng khách"
                                : "Number of guests"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}{" "}
                              {language === "vi"
                                ? num === 1
                                  ? "người"
                                  : "người"
                                : num === 1
                                  ? "person"
                                  : "people"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 3: Area and Notes */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-coffee-900 mb-4">
                        {t("booking.form.area")} *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {areas.map((area) => (
                          <Card
                            key={area.id}
                            className={`cursor-pointer transition-all border-2 ${
                              formData.area === area.id
                                ? "border-coffee-500 bg-coffee-50"
                                : "border-coffee-200 hover:border-coffee-300"
                            }`}
                            onClick={() => handleSelectChange("area", area.id)}
                          >
                            <CardContent className="p-4 text-center">
                              <MapPin className="w-8 h-8 mx-auto mb-2 text-coffee-600" />
                              <h3 className="font-semibold text-coffee-900 mb-1">
                                {area.name[language]}
                              </h3>
                              <p className="text-sm text-coffee-600">
                                {area.description[language]}
                              </p>
                              {formData.area === area.id && (
                                <Badge className="mt-2 bg-coffee-900 text-cream-100">
                                  {language === "vi" ? "Đã chọn" : "Selected"}
                                </Badge>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-coffee-900 mb-2">
                        {t("booking.form.notes")}
                      </label>
                      <Textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={4}
                        className="border-coffee-300 focus:border-coffee-500"
                        placeholder={
                          language === "vi"
                            ? "Ghi chú đặc biệt (tùy chọn)..."
                            : "Special notes (optional)..."
                        }
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Success */}
                {currentStep === 4 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                    <h3 className="text-2xl font-bold text-coffee-900 mb-4">
                      {language === "vi"
                        ? "Cảm ơn bạn đã đặt bàn!"
                        : "Thank you for your reservation!"}
                    </h3>
                    <p className="text-coffee-600 mb-6">
                      {language === "vi"
                        ? "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đặt bàn."
                        : "We will contact you soon to confirm your reservation."}
                    </p>
                    <div className="bg-coffee-50 p-6 rounded-lg mb-6">
                      <h4 className="font-semibold text-coffee-900 mb-4">
                        {language === "vi"
                          ? "Chi tiết đặt bàn:"
                          : "Booking details:"}
                      </h4>
                      <div className="text-left space-y-2 text-coffee-700">
                        <p>
                          <strong>
                            {language === "vi" ? "Tên:" : "Name:"}
                          </strong>{" "}
                          {formData.name}
                        </p>
                        <p>
                          <strong>
                            {language === "vi" ? "Điện thoại:" : "Phone:"}
                          </strong>{" "}
                          {formData.phone}
                        </p>
                        <p>
                          <strong>
                            {language === "vi" ? "Ngày giờ:" : "Date & Time:"}
                          </strong>{" "}
                          {formData.date} at {formData.time}
                        </p>
                        <p>
                          <strong>
                            {language === "vi" ? "Số khách:" : "Guests:"}
                          </strong>{" "}
                          {formData.guests}
                        </p>
                        <p>
                          <strong>
                            {language === "vi" ? "Khu vực:" : "Area:"}
                          </strong>{" "}
                          {
                            areas.find((a) => a.id === formData.area)?.name[
                              language
                            ]
                          }
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setCurrentStep(1);
                        setFormData({
                          name: "",
                          phone: "",
                          email: "",
                          date: "",
                          time: "",
                          guests: "",
                          area: "",
                          notes: "",
                        });
                      }}
                      className="bg-coffee-900 text-cream-100 hover:bg-coffee-800"
                    >
                      {language === "vi"
                        ? "Đặt bàn mới"
                        : "Make another reservation"}
                    </Button>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep < 4 && (
                  <div className="flex justify-between mt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setCurrentStep(Math.max(1, currentStep - 1))
                      }
                      disabled={currentStep === 1}
                      className="border-coffee-300 text-coffee-900 hover:bg-coffee-50"
                    >
                      {language === "vi" ? "Quay lại" : "Back"}
                    </Button>
                    <Button
                      type="submit"
                      className="bg-coffee-900 text-cream-100 hover:bg-coffee-800"
                    >
                      {currentStep === 3
                        ? t("booking.form.submit")
                        : language === "vi"
                          ? "Tiếp theo"
                          : "Next"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Booking;
