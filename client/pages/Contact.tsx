import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Send,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert(t("common.success"));
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-coffee-900 to-coffee-800 text-cream-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Coffee className="w-16 h-16 mx-auto mb-6 text-cream-200" />
            <h1 className="text-5xl lg:text-6xl font-bold font-serif mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-xl lg:text-2xl text-cream-200 max-w-3xl mx-auto">
              {language === "vi"
                ? "Chúng tôi rất mong được gặp bạn tại Sống KOFFI"
                : "We look forward to seeing you at Song KOFFI"}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-coffee-900 font-serif mb-6">
                  {language === "vi"
                    ? "Thông Tin Liên Hệ"
                    : "Contact Information"}
                </h2>
                <p className="text-coffee-600 text-lg mb-8">
                  {language === "vi"
                    ? "Hãy ghé thăm chúng tôi hoặc liên hệ qua các thông tin dưới đây."
                    : "Visit us or get in touch through the information below."}
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-coffee-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-coffee-100 rounded-lg">
                        <MapPin className="w-6 h-6 text-coffee-900" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-coffee-900 mb-1">
                          {language === "vi" ? "Địa Chỉ" : "Address"}
                        </h3>
                        <p className="text-coffee-600">
                          {t("contact.address")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-coffee-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-coffee-100 rounded-lg">
                        <Phone className="w-6 h-6 text-coffee-900" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-coffee-900 mb-1">
                          {t("contact.phone")}
                        </h3>
                        <a
                          href="tel:0867950728"
                          className="text-coffee-600 hover:text-coffee-900 transition-colors"
                        >
                          0867 950 728
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-coffee-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-coffee-100 rounded-lg">
                        <Mail className="w-6 h-6 text-coffee-900" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-coffee-900 mb-1">
                          Email
                        </h3>
                        <a
                          href="mailto:songkoffi.1706@gmail.com"
                          className="text-coffee-600 hover:text-coffee-900 transition-colors"
                        >
                          songkoffi.1706@gmail.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-coffee-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-coffee-100 rounded-lg">
                        <Clock className="w-6 h-6 text-coffee-900" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-coffee-900 mb-1">
                          {t("contact.hours")}
                        </h3>
                        <p className="text-coffee-600">
                          {t("contact.hours.value")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-coffee-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-coffee-100 rounded-lg">
                        <Facebook className="w-6 h-6 text-coffee-900" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-coffee-900 mb-1">
                          Facebook
                        </h3>
                        <a
                          href="https://www.facebook.com/SongKOFFI166"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-coffee-600 hover:text-coffee-900 transition-colors"
                        >
                          SongKOFFI166
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-coffee-200">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-coffee-900">
                    {language === "vi" ? "Gửi Tin Nhắn" : "Send Message"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-coffee-900 mb-2">
                          {language === "vi" ? "Họ và tên" : "Full Name"} *
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
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="border-coffee-300 focus:border-coffee-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-coffee-900 mb-2">
                        {t("contact.phone")}
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-coffee-300 focus:border-coffee-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-coffee-900 mb-2">
                        {language === "vi" ? "Tin nhắn" : "Message"} *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="border-coffee-300 focus:border-coffee-500"
                        placeholder={
                          language === "vi"
                            ? "Viết tin nhắn của bạn tại đây..."
                            : "Write your message here..."
                        }
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-coffee-900 text-cream-100 hover:bg-coffee-800"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {t("common.submit")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-coffee-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-coffee-900 font-serif mb-4">
              {language === "vi" ? "Tìm Chúng Tôi" : "Find Us"}
            </h2>
            <p className="text-lg text-coffee-600">
              {language === "vi"
                ? "Chúng tôi ở ngay trung tâm Quận 10, dễ dàng tìm thấy"
                : "We're located in the heart of District 10, easy to find"}
            </p>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4942750890433!2d106.66343891533447!3d10.772479962199896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed23c6b5ca1%3A0x87fb4d1f4b5b3f8!2s770B%20S%C6%B0%20V%E1%BA%A1n%20H%E1%BA%A1nh%2C%20Ph%C6%B0%E1%BB%9Dng%2012%2C%20Qu%E1%BA%ADn%2010%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1sen!2s!4v1642234567890!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Song KOFFI Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
